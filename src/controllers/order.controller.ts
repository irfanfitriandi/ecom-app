import { NextFunction, Request, Response } from 'express'

import { orderSchema } from '../schemas/order.schema'
import { Services } from '../services'

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = orderSchema.parse(req.body)

    const product = await Services.validateProduct(validatedData)

    const order = await Services.createOrder(validatedData)

    await Services.updateStockQuantity(product.id, validatedData.quantity)

    res.status(201).json({
      message: 'Order placed successfully',
      order,
      product,
      remaining_stock: product.stock_quantity - validatedData.quantity,
    })
  } catch (error) {
    next(error)
  }
}
