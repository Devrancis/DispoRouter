import { prisma } from '@/lib/prisma'
import { findMatchingBuyer } from '../engine'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { 
  Home, Users, PlusCircle, Activity, Building2, 
  CheckCircle2, XCircle, DollarSign, Database, Waves, 
  Ruler, LayoutDashboard, ArrowUpRight, Clock, 
  ShieldCheck, Server, AlertCircle
} from 'lucide-react'
import StatusDropdown from './StatusDropdown'

export const dynamic = 'force-dynamic' 

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) return null 

// 1. Parallel Data Fetching
  const [properties, buyers] = await Promise.all([
    prisma.propertySubmission.findMany({ 
      where: { userId: userId as string }, 
      orderBy: { id: 'desc' } 
    }),
    prisma.buyer.findMany({
      where: { userId: userId as string }
    }) 
  ])
  
  const buyersCount = buyers.length

  // 2. Compute Live Dashboard Analytics
  const totalPipelineValue = properties.reduce((sum, prop) => sum + prop.askingPrice, 0)
  
  // 3. Pass both arguments to the engine
  let matchedPropertiesCount = 0
  const propertiesWithMatches = properties.map(property => {
    const match = findMatchingBuyer(property, buyers)
    if (match) matchedPropertiesCount++
    return { ...property, match } // Attach single match
  })

  const matchRate = properties.length > 0 
    ? Math.round((matchedPropertiesCount / properties.length) * 100) 
    : 0

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 pb-20">
      
      {/* GLOBAL TOP NAVIGATION */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
                <LayoutDashboard className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Dispo<span className="text-indigo-600">Router</span>
              </span>
              <span className="hidden md:flex items-center gap-1.5 ml-4 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                SYSTEM OPERATIONAL
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-slate-50">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <div className="w-px h-5 bg-slate-200 mx-1"></div>
              <Link href="/buyers" className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all">
                <Users className="w-4 h-4" />
                Manage Buyers ({buyersCount})
              </Link>
              <Link href="/submit" className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all">
                <PlusCircle className="w-4 h-4" />
                New Asset
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* COMMAND CENTER HEADER */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Enterprise Pipeline</h1>
            <p className="text-slate-500 mt-1.5 text-sm font-medium">Algorithmic deal matching and asset routing command center.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <Server className="w-3.5 h-3.5" />
            Connected to Neon Serverless Postgres
          </div>
        </header>

        {/* BENTO BOX KPI METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Building2 className="w-32 h-32 text-indigo-900" />
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm font-bold text-slate-500 mb-1 relative z-10">Total Assets Ingested</p>
            <h3 className="text-3xl font-black text-slate-900 relative z-10">{properties.length}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <DollarSign className="w-32 h-32 text-emerald-900" />
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm font-bold text-slate-500 mb-1 relative z-10">Gross Pipeline Value</p>
            <h3 className="text-3xl font-black text-slate-900 relative z-10">{formatCurrency(totalPipelineValue)}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Activity className="w-32 h-32 text-amber-900" />
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm font-bold text-slate-500 mb-1 relative z-10">Routing Match Rate</p>
            <h3 className="text-3xl font-black text-slate-900 relative z-10">{matchRate}%</h3>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-indigo-400 flex items-center justify-center border border-slate-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm font-bold text-slate-400 mb-1 relative z-10">Engine Status</p>
            <h3 className="text-xl font-black text-white relative z-10 mb-2">Automated Ops Active</h3>
            <div className="flex gap-2 relative z-10">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">DB Synced</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded border border-indigo-500/20">Auth Locked</span>
            </div>
          </div>

        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Ingested Assets & Match Results</h3>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                {properties.length} Records
              </span>
            </div>

            {properties.length === 0 ? (
              <div className="p-16 flex flex-col items-center justify-center text-center bg-slate-50 flex-1">
                <div className="w-20 h-20 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center mb-4">
                  <Database className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Vault is empty</h3>
                <p className="text-slate-500 mt-2 mb-6 max-w-sm text-sm">Submit your first property asset to trigger the cross-referencing algorithm against your buyer database.</p>
                <Link href="/submit" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-sm transition-transform hover:scale-105">
                  <PlusCircle className="w-4 h-4" /> Initialize First Deal
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-white border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                      <th className="py-4 px-6">Asset Details (APN)</th>
                      <th className="py-4 px-6">Financials</th>
                      <th className="py-4 px-6">Specifications</th>
                      <th className="py-4 px-6">Routing Engine Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {propertiesWithMatches.map((property) => {
                      const hasMatch = !!property.match
                      const pricePerSqFt = property.sqFt > 0 ? Math.round(property.askingPrice / property.sqFt) : 0

                      return (
                        <tr key={property.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="py-4 px-6 align-top">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-slate-900 font-mono text-base">{property.apn}</span>
                              <StatusDropdown propertyId={property.id} currentStatus={property.status} />
                            </div>
                            <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                              ID: {property.id.substring(0, 8)}...
                            </div>
                          </td>
                          <td className="py-4 px-6 align-top">
                            <div className="font-bold text-emerald-700 text-base">{formatCurrency(property.askingPrice)}</div>
                            <div className="text-xs text-slate-500 font-medium mt-1">
                              ${pricePerSqFt} / sqft
                            </div>
                          </td>
                          <td className="py-4 px-6 align-top">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                <Ruler className="w-3.5 h-3.5 text-slate-400" />
                                {property.sqFt.toLocaleString()} SqFt
                              </div>
                              <div className="flex gap-2">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100">
                                  <Waves className="w-3 h-3" /> Zone {property.floodZone}
                                </span>
                                {property.hasSeawall && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 text-[10px] font-bold border border-cyan-100">
                                    Seawall: Yes
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 align-top">
                            {hasMatch ? (
                              <div className="flex flex-col items-start gap-2">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-sm">
                                  <CheckCircle2 className="w-4 h-4" />
                                  Buyer Matched
                                </div>
                                <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                                  <ArrowUpRight className="w-3 h-3" />
                                  Top match: {property.match?.name}
                                </div>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-xs font-bold">
                                <AlertCircle className="w-4 h-4 text-slate-400" />
                                No Buy Box Matches
                              </div>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                Live Routing Logs
              </h3>
            </div>
            
            <div className="p-5 flex-1 relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800/40 via-slate-900 to-slate-900">
              <div className="space-y-4">
                {properties.slice(0, 5).map((prop, index) => {
                  const matchStatus = findMatchingBuyer(prop, buyers) ? 'Match found' : '0 hits'
                  
                  return (
                    <div key={`log-${prop.id}`} className="flex gap-3 text-sm relative">
                      {index !== properties.slice(0, 5).length - 1 && (
                        <div className="absolute left-1.5 top-5 w-px h-full bg-slate-800"></div>
                      )}
                      
                      <div className="mt-1 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-slate-300 font-medium text-xs leading-relaxed">
                          Ingested APN <span className="text-indigo-300 font-mono">{prop.apn}</span>
                        </p>
                        <p className="text-slate-500 text-[10px] font-mono mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> 
                          Engine scan complete • {matchStatus}
                        </p>
                      </div>
                    </div>
                  )
                })}

                {properties.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-slate-500 text-xs font-mono">System standing by for data ingestion...</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 text-[10px] font-mono text-slate-500 flex justify-between">
              <span>root@disporouter:~#</span>
              <span className="text-emerald-500">_</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}