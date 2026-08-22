import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// 1. Create a standard Postgres connection pool
const connectionString = process.env.DATABASE_URL!
const pool = new Pool({ connectionString })

// 2. Wrap it in the Prisma v7 adapter
const adapter = new PrismaPg(pool)

// 3. Initialize Prisma with the adapter
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}