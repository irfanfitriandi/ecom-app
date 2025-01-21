import { PrismaClient } from '@prisma/client'
import got from 'got'

import { PRODUCT_API_URL } from './constants.utils'
import { createError } from './error.utils'
import { IResData, Product } from './types.utils'

const prisma = new PrismaClient()

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const productsDb = await prisma.product.findMany()

    if (productsDb.length > 0) {
      return productsDb
    }

    const response = await got.get(PRODUCT_API_URL).json<IResData[]>()
    const products = response.map((item) => ({
      id: item.id,
      name: item.title,
      price: Math.round(Math.random() * 1000),
      in_stock: item.id % 2 !== 0,
      stock_quantity: Math.round(Math.random() * 100),
    }))

    await prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    })

    return products
  } catch (error) {
    throw createError('Failed to fetch products', 503)
  }
}
