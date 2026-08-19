import { defineConfig } from '@prisma/config'
import { config } from 'dotenv'

config()

export default defineConfig({
  migrations: {
    seed: 'npx tsx ./prisma/seed.ts',
  },
  datasource: {
    url: process.env.DIRECT_URL,
  },
})