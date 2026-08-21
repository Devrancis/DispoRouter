import Link from 'next/link'
import { ArrowLeft, BookOpen, Terminal, Code2, Database } from 'lucide-react'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Docs Header */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="font-black text-xl tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            DispoRouter <span className="text-slate-400 font-medium">Docs</span>
          </div>
          <Link href="/" className="text-sm font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to App
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-black tracking-tight mb-4">Platform Documentation</h1>
        <p className="text-lg text-slate-600 mb-12">Learn how the DispoRouter algorithmic matching engine processes inbound assets and cross-references them against your buyer buy-boxes.</p>

        <div className="space-y-12">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 border-b border-slate-200 pb-2 mb-4">
              <Terminal className="w-5 h-5 text-indigo-600" /> Core Architecture
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              DispoRouter is built on a high-performance Next.js 16 stack. It utilizes a Serverless PostgreSQL database (Neon) to maintain ultra-low latency connections, ensuring that when an asset is ingested, the cross-referencing algorithm executes in under 50ms.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 border-b border-slate-200 pb-2 mb-4">
              <Code2 className="w-5 h-5 text-indigo-600" /> The Matching Algorithm
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              The proprietary `findMatchingBuyer` engine evaluates three strict criteria concurrently before a match is verified:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium mb-6">
              <li><strong className="text-slate-900">Budget Thresholds:</strong> Property asking price must be ≤ Buyer Max Budget.</li>
              <li><strong className="text-slate-900">Square Footage:</strong> Property SqFt must be ≥ Buyer Minimum SqFt.</li>
              <li><strong className="text-slate-900">Flood Zone Risks:</strong> Asset flood zone must precisely match the buyer's accepted risk profile.</li>
            </ul>
            
            <div className="bg-slate-900 rounded-xl p-5 overflow-x-auto shadow-xl">
              <pre className="text-sm text-emerald-400 font-mono">
                <code>{`// Engine Logic Output
const engine = new DispoRouter();
const match = await engine.crossReference({
  apn: "8429",
  askingPrice: 450000,
  sqFt: 2200,
  floodZone: "X"
});

console.log(match); // { status: 200, buyer: "Meridian Cap" }`}</code>
              </pre>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 border-b border-slate-200 pb-2 mb-4">
              <Database className="w-5 h-5 text-indigo-600" /> WebSockets & Automation (Upcoming)
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Phase 3 of the DispoRouter deployment will introduce live telemetry pipelines. Upon a successful algorithmic match, the system will trigger a Twilio REST API payload to instantly broadcast SMS notifications to the matched VIP buyer.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}