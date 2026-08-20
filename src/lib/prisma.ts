import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

// Use a global variable to store the Prisma instance in development
// so hot-reloading doesn't exhaust the database connection limit.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const connectionString = process.env.DATABASE_URL!

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaNeon({ connectionString }),
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma