import { describe, expect, it } from 'vitest'

import { OrderService } from '../services/order.service'
import { Product } from '../utils/types.utils'

describe('OrderService', () => {
  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 100, inStock: true },
    { id: 2, name: 'Product 2', price: 200, inStock: false },
  ]

  describe('validateProduct', () => {
    it('should return product when valid and in stock', () => {
      const result = OrderService.validateProduct(mockProducts, 1)
      expect(result).toEqual(mockProducts[0])
    })

    it('should throw error when product not found', () => {
      expect(() => OrderService.validateProduct(mockProducts, 3)).toThrow(
        'Product not found'
      )
    })

    it('should throw error when product out of stock', () => {
      expect(() => OrderService.validateProduct(mockProducts, 2)).toThrow(
        'Product is out of stock'
      )
    })
  })
})
