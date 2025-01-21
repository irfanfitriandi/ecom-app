import { Order, PrismaClient } from '@prisma/client'

import { OrderSchemaType } from '../schemas/order.schema'

import { createError } from '../utils/error.utils'
import { Product } from '../utils/types.utils'

const prisma = new PrismaClient()

export const OrderService = {
  validateProduct: (products: Product[], productId: number): Product => {
    const product = products.find((p) => p.id === productId)
    if (!product) {
      throw createError('Product not found', 404)
    }
    if (!product.inStock) {
      throw createError('Product is out of stock', 400)
    }
    return product
  },

  createOrder: async (orderData: OrderSchemaType): Promise<Order> => {
    return await prisma.order.create({
      data: {
        product_id: orderData.productId,
        quantity: orderData.quantity,
      },
    })
  },
}
