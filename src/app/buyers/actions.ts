'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addBuyer(formData: FormData) {
  const name = formData.get('name') as string
  const budgetMax = Number(formData.get('budgetMax'))
  const minSqFt = Number(formData.get('minSqFt'))
  const floodZone = formData.get('floodZone') as string
  // Checkbox returns 'on' if checked, null if not
  const requiresSeawall = formData.get('requiresSeawall') === 'on'

  await prisma.buyer.create({
    data: {
      name,
      budgetMax,
      minSqFt,
      floodZone,
      requiresSeawall
    }
  })

  // Refresh the page data instantly
  revalidatePath('/buyers')
  revalidatePath('/dashboard') 
}

export async function deleteBuyer(formData: FormData) {
  const id = formData.get('id') as string
  
  await prisma.buyer.delete({
    where: { id }
  })

  revalidatePath('/buyers')
  revalidatePath('/dashboard')
}