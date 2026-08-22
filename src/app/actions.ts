'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function submitProperty(formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized: You must be logged in to submit an asset.")
  }

  const apn = String(formData.get('apn'))
  const askingPrice = Number(formData.get('askingPrice'))
  const sqFt = Number(formData.get('sqFt'))
  const floodZone = String(formData.get('floodZone'))
  const hasSeawall = formData.get('hasSeawall') === 'on' 

  // 3. Create the property and attach it to the specific user
  await prisma.propertySubmission.create({
    data: {
      userId,
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