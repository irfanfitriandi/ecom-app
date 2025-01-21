import { NextFunction, Request, Response } from 'express'

import { fetchProducts } from '../utils/fetch.utils'

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10
    const startIndex = (page - 1) * limit

    const products = await fetchProducts()
    const paginatedProducts = products.slice(startIndex, startIndex + limit)

    res.json({
      currentPage: page,
      totalPages: Math.ceil(products.length / limit),
      products: paginatedProducts,
    })
  } catch (error) {
    next(error)
  }
}
