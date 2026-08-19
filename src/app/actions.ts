// src/app/actions.ts
'use server'

import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless'
import ws from 'ws'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

neonConfig.webSocketConstructor = ws

const adapter = new PrismaNeon({ 
  connectionString: process.env.DATABASE_URL! 
})

const prisma = new PrismaClient({ adapter })

/**
 * Server Action for the /submit form
 */
export async function submitProperty(formData: FormData) {
  const apn = String(formData.get('apn'))
  const askingPrice = Number(formData.get('askingPrice'))
  const sqFt = Number(formData.get('sqFt'))
  const floodZone = String(formData.get('floodZone'))
  const hasSeawall = formData.get('hasSeawall') === 'on' 


  await prisma.propertySubmission.create({
    data: {
      apn,
      askingPrice,
      sqFt,
      floodZone,
      hasSeawall,
      status: 'PENDING' 
    }
  })

  // Revalidate the dashboard so the new property shows up instantly
  revalidatePath('/dashboard')
  
  // Send the user to the dashboard
  redirect('/dashboard') 
}