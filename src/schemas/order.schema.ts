import { z } from 'zod'

export type OrderSchemaType = z.infer<typeof orderSchema>

export const orderSchema = z.object({
  product_id: z.number().positive(),
  quantity: z.number().min(1),
})
