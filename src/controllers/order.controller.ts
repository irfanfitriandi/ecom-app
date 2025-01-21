import { NextFunction, Request, Response } from 'express'
import { orderSchema } from '../schemas/order.schema'
import { OrderService } from '../services/order.service'
import { fetchProducts } from '../utils/fetch.utils'

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = orderSchema.parse(req.body)

    const products = await fetchProducts()
    const product = OrderService.validateProduct(
      products,
      validatedData.productId
    )

    const order = await OrderService.createOrder(validatedData)

    res.status(201).json({
      message: 'Order placed successfully',
      order,
      product,
    })
  } catch (error) {
    next(error)
  }
}
