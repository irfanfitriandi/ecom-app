import { Order, PrismaClient } from '@prisma/client'

import { OrderSchemaType } from '../schemas/order.schema'

import { createError } from '../utils/error.utils'
import { Product } from '../utils/types.utils'

const prisma = new PrismaClient()

export const Services = {
  getProductById: async (productId: number) => {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })
    return product
  },

  validateProduct: async (orderData: OrderSchemaType): Promise<Product> => {
    const product = await prisma.product.findUnique({
      where: { id: orderData.product_id },
    })
    if (!product) {
      throw createError('Product not found', 404)
    }
    if (!product.in_stock) {
      throw createError('Product is out of stock', 400)
    }
    if (product.stock_quantity < orderData.quantity) {
      throw createError('Insufficient stock quantity', 400)
    }
    return product
  },

  updateStockQuantity: async (orderData: OrderSchemaType) => {
    await prisma.product.update({
      where: { id: orderData.product_id },
      data: {
        stock_quantity: {
          decrement: orderData.quantity,
        },
      },
    })
  },

  createOrder: async (orderData: OrderSchemaType): Promise<Order> => {
    return await prisma.order.create({
      data: {
        product_id: orderData.product_id,
        quantity: orderData.quantity,
      },
    })
  },
}
