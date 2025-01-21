import type { Response } from 'express'
import { ZodError } from 'zod'

import { ApiError } from '../utils/types.utils'

export const errorHandler = (
  err: Error | ApiError | ZodError,
  res: Response
): void => {
  console.error(`[${new Date().toISOString()}] ${err.stack}`)

  res.setHeader('Content-Type', 'application/json')

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'There was an issue with the information you provided.',
      details: err.errors.map((error) => ({
        field: error.path.join('.'),
        issue: error.message,
      })),
    })
    return
  }

  const statusCode = (err as ApiError).statusCode || 500
  const userFriendlyMessage =
    statusCode === 404
      ? 'The resource you are looking for could not be found.'
      : statusCode === 400
      ? 'There was a problem with your request. Please check and try again.'
      : 'Something went wrong on our side. Please try again later.'

  let message = err.message || 'An unexpected error occurred'

  if (err.message.includes('Insufficient stock quantity')) {
    message = 'Not enough items in stock to complete your order'
  }

  res.status(statusCode).json({
    success: false,
    message: userFriendlyMessage,
    error: message,
  })
}
