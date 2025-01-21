export interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
}

export interface OrderRequestBody {
  productId: number
  quantity: number
}

export interface IResData {
  userId: number
  id: number
  title: string
  body: string
}

export interface ApiError extends Error {
  statusCode?: number
}
