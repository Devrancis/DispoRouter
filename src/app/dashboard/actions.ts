'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateAssetStatus(propertyId: string, newStatus: string) {
  try {
    await prisma.propertySubmission.update({
      where: { id: propertyId },
      data: { status: newStatus }
    })
    
    // This tells Next.js to instantly refresh the dashboard data
    revalidatePath('/dashboard') 
    return { success: true }
  } catch (error) {
    console.error("Failed to update status:", error)
    return { success: false }
  }
}