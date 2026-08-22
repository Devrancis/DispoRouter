'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function createBuyer(formData: FormData) {
  // 1. Get logged-in user
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized: You must be logged in to create a buyer.')
  }

  const name = String(formData.get('name'))
  const budgetMax = Number(formData.get('budgetMax'))
  const minSqFt = Number(formData.get('minSqFt'))
  const floodZone = String(formData.get('floodZone'))
  const requiresSeawall = formData.get('requiresSeawall') === 'on' || formData.get('requiresSeawall') === 'true'

  // 2. Pass userId into the creation payload
  await prisma.buyer.create({
    data: {
      userId, // <--- Added userId here
      name,
      budgetMax,
      minSqFt,
      floodZone,
      requiresSeawall,
    },
  })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}