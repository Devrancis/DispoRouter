import { Buyer, PropertySubmission } from '@prisma/client'

export function findMatchingBuyer(property: PropertySubmission, buyers: Buyer[]): Buyer | null {
  for (const buyer of buyers) {
    const meetsBudget = property.askingPrice <= buyer.budgetMax;
    const meetsSqFt = property.sqFt >= buyer.minSqFt;
    const meetsFloodZone = property.floodZone === buyer.floodZone;
    
    const meetsSeawall = buyer.requiresSeawall ? property.hasSeawall === true : true;

    if (meetsBudget && meetsSqFt && meetsFloodZone && meetsSeawall) {
      return buyer;
    }
  }
  return null;
}