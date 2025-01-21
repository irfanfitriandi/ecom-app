export interface Product {
  id: number
  name: string
  price: number
  in_stock: boolean
  stock_quantity: number
}

export interface OrderRequestBody {
  product_id: number
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
