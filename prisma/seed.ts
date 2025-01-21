import { PrismaClient } from '@prisma/client'
import got from 'got'

const prisma = new PrismaClient()

interface IResData {
  id: number
  title: string
  body: string
}

async function main() {
  try {
    const response: IResData[] = await got
      .get('https://jsonplaceholder.typicode.com/posts')
      .json<IResData[]>()

    const products = response.map((item) => ({
      id: item.id,
      name: item.title,
      price: Math.round(Math.random() * 1000),
      in_stock: item.id % 2 !== 0,
      stock_quantity: Math.round(Math.random() * 100),
    }))

    await prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    })

    console.log('Seeded products successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
