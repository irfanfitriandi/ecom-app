import express from 'express'
import { errorHandler } from './middlewares/error.middlewares'
import { requestLogger } from './middlewares/log.middlewares'
import orderRoutes from './routes/order.routes'
import productRoutes from './routes/product.routes'

const app = express()

app.use(express.json())

app.use(requestLogger)

// Routes
app.use('/products', productRoutes)
app.use('/order', orderRoutes)

app.use(errorHandler as any)

export default app
