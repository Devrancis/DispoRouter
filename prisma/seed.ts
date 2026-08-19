// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing buyers to prevent duplicates on re-runs
  await prisma.buyer.deleteMany()

  await prisma.buyer.createMany({
    data: [
      { name: "Buyer A (Target)", budgetMax: 130000, floodZone: "X500", requiresSeawall: true, minSqFt: 10000 },
      { name: "Buyer B (Cheap)", budgetMax: 50000, floodZone: "AE", requiresSeawall: false, minSqFt: 5000 },
      { name: "Buyer C (Whale)", budgetMax: 250000, floodZone: "X", requiresSeawall: false, minSqFt: 20000 },
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