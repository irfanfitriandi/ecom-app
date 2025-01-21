import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createOrder } from '../controllers/order.controller'
import { OrderService } from '../services/order.service'
import { Product } from '../utils/types.utils'

vi.mock('../src/services/order.service')
vi.mock('../src/utils/fetch.utils')

describe('Order Controller', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 100,
    inStock: true,
  }

  const mockOrder = {
    id: 1,
    product_id: 1,
    quantity: 2,
    created_at: new Date(),
  }

  const mockRequest = {
    body: {
      productId: 1,
      quantity: 2,
    },
  } as any

  const mockResponse = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as any

  const mockNext = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create an order successfully', async () => {
    vi.mocked(OrderService.validateProduct).mockResolvedValue(mockProduct)
    vi.mocked(OrderService.createOrder).mockResolvedValue(mockOrder)

    await createOrder(mockRequest, mockResponse, mockNext)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Order placed successfully',
      order: mockOrder,
      product: mockProduct,
    })
  })

  it('should handle validation errors', async () => {
    const invalidRequest = {
      body: {
        productId: -1,
        quantity: 0,
      },
    } as any

    await createOrder(invalidRequest, mockResponse, mockNext)

    expect(mockNext).toHaveBeenCalled()
  })
})
