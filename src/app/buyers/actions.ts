'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

// 1. ADD BUYER FUNCTION
export async function addBuyer(formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized: You must be logged in to add a buyer.')
  }

  const name = String(formData.get('name'))
  const budgetMax = Number(formData.get('budgetMax'))
  const minSqFt = Number(formData.get('minSqFt'))
  const floodZone = String(formData.get('floodZone'))
  const requiresSeawall = formData.get('requiresSeawall') === 'on' || formData.get('requiresSeawall') === 'true'

  await prisma.buyer.create({
    data: {
      userId,
      name,
      budgetMax,
      minSqFt,
      floodZone,
      requiresSeawall,
    },
  })

  // Refresh the UI to show the new data
  revalidatePath('/buyers')
  revalidatePath('/dashboard')
  
  // Back to dashboard
  redirect('/dashboard')
}

// 2. DELETE BUYER FUNCTION
export async function deleteBuyer(formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized: You must be logged in to delete a buyer.')
  }

  const id = String(formData.get('id'))

  // Delete the buyer, ensuring it belongs to the logged-in user
  await prisma.buyer.deleteMany({
    where: {
      id,
      userId,
    },
  })

  // Refresh the UI to reflect the deletion
  revalidatePath('/buyers')
  revalidatePath('/dashboard')
}

export const createBuyer = addBuyer