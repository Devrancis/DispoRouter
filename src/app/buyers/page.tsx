import { prisma } from '@/lib/prisma'
import { addBuyer, deleteBuyer } from './actions'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function BuyersPage() {
  const buyers = await prisma.buyer.findMany({
    orderBy: { id: 'desc' }
  })

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 sm:gap-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/dashboard" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                &larr; Back to Pipeline
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-1">Buyer Network</h1>
            <p className="text-gray-500 text-sm sm:text-base font-medium">Manage your active cash buyers and their exact Buy Boxes.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add New Buyer Form */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-fit">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Add New Buyer</h2>
            <form action={addBuyer} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Firm/Buyer Name</label>
                <input type="text" name="name" required placeholder="e.g. Meridian Capital" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Max Budget</label>
                  <input type="number" name="budgetMax" required placeholder="150000" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Min SqFt</label>
                  <input type="number" name="minSqFt" required placeholder="5000" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Target Flood Zone</label>
                <select name="floodZone" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm">
                  <option value="X">Zone X (Minimal Risk)</option>
                  <option value="X500">Zone X500 (Moderate Risk)</option>
                  <option value="AE">Zone AE (High Risk)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" name="requiresSeawall" id="seawall" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                <label htmlFor="seawall" className="text-sm font-medium text-gray-700">Requires Seawall?</label>
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg mt-2 hover:bg-indigo-700 transition-colors shadow-sm text-sm">
                Save Buyer Profile
              </button>
            </form>
          </div>

          {/* Active Buyers Table */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <tr>
                    <th className="px-5 py-4 font-bold">Buyer Name</th>
                    <th className="px-5 py-4 font-bold">Max Budget</th>
                    <th className="px-5 py-4 font-bold">Criteria</th>
                    <th className="px-5 py-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {buyers.length === 0 && (
                    <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-500">No buyers found.</td></tr>
                  )}
                  {buyers.map((buyer) => (
                    <tr key={buyer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-semibold text-gray-900">{buyer.name}</td>
                      <td className="px-5 py-4 text-green-700 font-medium">${buyer.budgetMax.toLocaleString()}</td>
                      <td className="px-5 py-4 text-gray-600">
                        {buyer.minSqFt} sqft • Zone {buyer.floodZone} {buyer.requiresSeawall && '• Seawall'}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <form action={deleteBuyer}>
                          <input type="hidden" name="id" value={buyer.id} />
                          <button type="submit" className="text-red-500 hover:text-red-700 font-medium text-xs bg-red-50 px-3 py-1.5 rounded-md border border-red-100 transition-colors">
                            Remove
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}