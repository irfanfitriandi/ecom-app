import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

import { Product } from '@prisma/client'
import got from 'got'
import app from '../app'
import { IResData } from '../utils/types.utils'

vi.mock('got')
vi.mock('http-errors')

describe('GET /products', () => {
  it('should return paginated products from cache', async () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', price: 100, in_stock: true },
      { id: 2, name: 'Product 2', price: 200, in_stock: false },
    ]

    const res = await request(app).get('/products').query({ page: 1, limit: 1 })

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      currentPage: 1,
      totalPages: 2,
      products: [mockProducts[0]],
    })
  })

  it('should fetch products from API if cache is empty', async () => {
    const mockApiResponse: IResData[] = [
      {
        userId: 1,
        id: 1,
        title: 'API Product 1',
        body: 'Product 1 description',
      },
      {
        userId: 2,
        id: 2,
        title: 'API Product 2',
        body: 'Product 2 description',
      },
    ]

    got.get = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockApiResponse),
    })

    const res = await request(app).get('/products').query({ page: 1, limit: 2 })

    expect(res.status).toBe(200)
    expect(res.body.currentPage).toBe(1)
    expect(res.body.totalPages).toBe(1)
    expect(res.body.products).toHaveLength(2)
  })

  it('should handle errors from the API gracefully', async () => {
    got.get = vi.fn().mockRejectedValue(new Error('API Error'))

    const res = await request(app).get('/products')

    expect(res.status).toBe(503)
    expect(res.body.message).toBe('Failed to fetch products')
  })
})
