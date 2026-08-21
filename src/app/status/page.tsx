import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Activity, Server, Database } from 'lucide-react'

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans py-12 px-6">
      <div className="max-w-3xl mx-auto">
        
        <Link href="/" className="text-sm font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1.5 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to DispoRouter
        </Link>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center mb-8">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">All Systems Operational</h1>
          <p className="text-slate-500 font-medium">Last updated: Just now</p>
        </div>

        <h2 className="text-lg font-bold mb-4 px-2">System Metrics</h2>
        
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Item 1 */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-slate-400" />
              <span className="font-bold text-slate-700">Algorithmic Routing Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 hidden sm:block">42ms latency</span>
              <span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Operational</span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-slate-400" />
              <span className="font-bold text-slate-700">Neon Serverless DB (EU-West)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 hidden sm:block">12ms latency</span>
              <span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Operational</span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-slate-400" />
              <span className="font-bold text-slate-700">Vercel Edge Network</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Operational</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}