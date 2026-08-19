// src/app/actions.ts
'use server'

import { PrismaClient, Buyer, PropertySubmission } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

/**
 * Core Matching Engine:
 * Compares a single property against an array of buyers.
 * Returns the first matched Buyer, or null.
 */
export function findMatchingBuyer(property: PropertySubmission, buyers: Buyer[]): Buyer | null {
  for (const buyer of buyers) {
    const meetsBudget = property.askingPrice <= buyer.budgetMax;
    const meetsSqFt = property.sqFt >= buyer.minSqFt;
    const meetsFloodZone = property.floodZone === buyer.floodZone;
    
    // Logic: If buyer requires a seawall, property MUST have one. 
    // If they don't require it, a seawall is optional (doesn't ruin the deal).
    const meetsSeawall = buyer.requiresSeawall ? property.hasSeawall === true : true;

    if (meetsBudget && meetsSqFt && meetsFloodZone && meetsSeawall) {
      return buyer;
    }
  }
  return null;
}

/**
 * Server Action for the /submit form
 */
export async function submitProperty(formData: FormData) {
  const apn = String(formData.get('apn'))
  const askingPrice = Number(formData.get('askingPrice'))
  const sqFt = Number(formData.get('sqFt'))
  const floodZone = String(formData.get('floodZone'))
  const hasSeawall = formData.get('hasSeawall') === 'on' 

  // Save the submission
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
  
  // Send the user to the dashboard to immediately show off the "Hot Match" magic in your demo
  redirect('/dashboard') 
}