import { ApiError } from './types.utils'

export const createError = (message: string, statusCode: number): ApiError => {
  const error: ApiError = new Error(message)
  error.statusCode = statusCode
  return error
}
