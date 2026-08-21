import { PrismaClient } from '@prisma/client'
import { findMatchingBuyer } from '../engine'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Home, Users, PlusCircle } from 'lucide-react' 

export const dynamic = 'force-dynamic' 

export default async function DashboardPage() {
  const properties = await prisma.propertySubmission.findMany({ 
    orderBy: { id: 'desc' }
  })
  const buyers = await prisma.buyer.findMany()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header section adjusts for mobile */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-1 sm:mb-2">Disposition Pipeline</h1>
            <p className="text-gray-500 text-sm sm:text-base font-medium">Live property submissions instantly cross-referenced against your active buyers.</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Link 
              href="/" 
              className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-3 sm:py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link href="/buyers" className="w-full sm:w-auto text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-3 sm:py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors">
              Manage Buyers
            </Link>
            <Link href="/submit" className="w-full sm:w-auto text-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 sm:py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors">
              + New Deal
            </Link>
          </div>
        </div>

        {/* overflow-x-auto ensures the table scrolls left/right on phones instead of breaking the layout */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap min-w-[700px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <tr>
                  <th className="px-4 sm:px-6 py-4 font-bold">APN</th>
                  <th className="px-4 sm:px-6 py-4 font-bold">Asking Price</th>
                  <th className="px-4 sm:px-6 py-4 font-bold">SqFt</th>
                  <th className="px-4 sm:px-6 py-4 font-bold">Flood Zone</th>
                  <th className="px-4 sm:px-6 py-4 font-bold">Seawall</th>
                  <th className="px-4 sm:px-6 py-4 font-bold">Match Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {properties.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 sm:px-6 py-12 text-center text-gray-500 font-medium">
                      No properties submitted yet.
                    </td>
                  </tr>
                )}
                
                {properties.map((prop) => {
                  const matchedBuyer = findMatchingBuyer(prop, buyers)
                  
                  return (
                    <tr 
                      key={prop.id} 
                      className={`transition-colors hover:bg-gray-50 ${matchedBuyer ? 'bg-green-50/50' : ''}`}
                    >
                      <td className="px-4 sm:px-6 py-4 font-mono font-medium text-gray-600">{prop.apn}</td>
                      <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900">${prop.askingPrice.toLocaleString()}</td>
                      <td className="px-4 sm:px-6 py-4 text-gray-700">{prop.sqFt.toLocaleString()}</td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className="bg-gray-100 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-md text-xs font-semibold">{prop.floodZone}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-gray-600 font-medium">
                        {prop.hasSeawall ? 'Yes' : 'No'}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        {matchedBuyer ? (
                          <div className="inline-flex items-center gap-1.5 bg-green-100 border border-green-200 text-green-800 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm">
                            <span>🔥</span>
                            MATCH: {matchedBuyer.name.toUpperCase()}
                          </div>
                        ) : (
                          <div className="inline-flex items-center text-gray-400 bg-gray-50 border border-gray-100 rounded-full text-xs font-semibold px-3 py-1.5">
                            No Match
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  )
}