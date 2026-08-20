import 'dotenv/config' 
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

const adapter = new PrismaNeon({ 
  connectionString: process.env.DATABASE_URL! 
})

const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.buyer.deleteMany()

  await prisma.buyer.createMany({
    data: [
      { name: "Carter Holdings (Target)", budgetMax: 130000, floodZone: "X500", requiresSeawall: true, minSqFt: 10000 },
      { name: "Apex Real Estate (Cheap)", budgetMax: 50000, floodZone: "AE", requiresSeawall: false, minSqFt: 5000 },
      { name: "Meridian Capital (Whale)", budgetMax: 250000, floodZone: "X", requiresSeawall: false, minSqFt: 20000 },
    ]
  })

  console.log("✅ DB Seeded with mock buyers!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })