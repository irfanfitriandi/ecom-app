import { z } from 'zod'

export type OrderSchemaType = z.infer<typeof orderSchema>

export const orderSchema = z.object({
  productId: z.number().positive(),
  quantity: z.number().min(1),
})
