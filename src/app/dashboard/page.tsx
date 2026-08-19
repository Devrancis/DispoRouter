// src/app/dashboard/page.tsx
import { PrismaClient } from '@prisma/client'
import { findMatchingBuyer } from '../actions'
import Link from 'next/link'

const prisma = new PrismaClient()

// Disable caching so the dashboard updates instantly for the demo
export const dynamic = 'force-dynamic' 

export default async function DashboardPage() {
  const properties = await prisma.propertySubmission.findMany({ 
    orderBy: { id: 'desc' } // Newest first
  })
  const buyers = await prisma.buyer.findMany()

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Dispo Command Center</h1>
            <p className="text-zinc-400">Live property submissions cross-referenced with your Buy Boxes.</p>
          </div>
          <Link href="/submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            + New Deal
          </Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-medium">APN</th>
                <th className="px-6 py-4 font-medium">Asking Price</th>
                <th className="px-6 py-4 font-medium">SqFt</th>
                <th className="px-6 py-4 font-medium">Flood Zone</th>
                <th className="px-6 py-4 font-medium">Seawall</th>
                <th className="px-6 py-4 font-medium">Match Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {properties.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    No properties submitted yet.
                  </td>
                </tr>
              )}
              
              {properties.map((prop) => {
                // Run our dynamic matching logic!
                const matchedBuyer = findMatchingBuyer(prop, buyers)
                
                return (
                  <tr 
                    key={prop.id} 
                    className={`transition-colors hover:bg-zinc-800/30 ${matchedBuyer ? 'bg-green-950/20' : ''}`}
                  >
                    <td className="px-6 py-4 font-mono text-zinc-300">{prop.apn}</td>
                    <td className="px-6 py-4 font-medium">${prop.askingPrice.toLocaleString()}</td>
                    <td className="px-6 py-4">{prop.sqFt.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-xs">{prop.floodZone}</span>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {prop.hasSeawall ? 'Yes' : 'No'}
                    </td>
                    <td className="px-6 py-4">
                      {matchedBuyer ? (
                        <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide">
                          <span>🔥</span>
                          HOT MATCH: {matchedBuyer.name.toUpperCase()}
                        </div>
                      ) : (
                        <div className="inline-flex items-center text-zinc-500 text-xs font-medium px-3 py-1.5">
                          Evaluating...
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
  )
}