import { Response } from 'express'
import { ZodError } from 'zod'
import { ApiError } from '../utils/types.utils'

export const errorHandler = (
  err: Error | ApiError | ZodError,
  res: Response
): void => {
  console.error(`[${new Date().toISOString()}] ${err.stack}`)

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation error',
      details: err.errors,
    })
    return
  }

  const statusCode = (err as ApiError).statusCode || 500
  res.status(statusCode).json({
    error: err.message || 'An unexpected error occurred',
  })
}
