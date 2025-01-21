import { PrismaClient } from '@prisma/client'

import app from './app'
import { PORT } from './utils/constants.utils'

const prisma = new PrismaClient()

const startServer = (): void => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

startServer()

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
