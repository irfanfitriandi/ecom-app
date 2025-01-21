import got from 'got'

import { PRODUCT_API_URL } from './constants.utils'
import { createError } from './error.utils'
import { Product } from './types.utils'
import { IResData } from './types.utils.js'

const PRODUCTS_CACHE_KEY = 'products'

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await got.get(PRODUCT_API_URL).json<IResData[]>()
    console.log(response)
    const products = response.map((item) => ({
      id: item.id,
      name: item.title,
      price: Math.round(Math.random() * 1000),
      inStock: item.id % 2 !== 0,
    }))

    return products
  } catch (error) {
    throw createError('Failed to fetch products', 503)
  }
}
