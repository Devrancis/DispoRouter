'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { 
  ArrowRight, Zap, Target, Lock, Database, 
  Workflow, ChevronRight, ShieldCheck, Building2, 
  Activity, Server, Clock, CheckCircle2, LineChart, 
  AlertCircle, X
} from 'lucide-react'

// --- ANIMATION VARIANTS ---
const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
}

const float: Variants = {
  initial: { y: 0 },
  animate: { 
    y: [-5, 5, -5], 
    transition: { repeat: Infinity, duration: 6, ease: "easeInOut" } 
  }
}

// --- MOCK DATA FOR THE HERO DASHBOARD ---
const mockRoutingFeed = [
  { id: "APN-8429", address: "1420 W Riverside Dr, FL", price: "$1,250,000", match: "Meridian Capital", time: "42ms" },
  { id: "APN-9912", address: "8840 N Highland Ave, TX", price: "$840,000", match: "Apex Holdings", time: "38ms" },
  { id: "APN-3104", address: "220 E Bayview Ct, CA", price: "$2,100,000", match: "Carter Real Estate", time: "51ms" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-indigo-100 overflow-hidden">
      
      {/* GLOBAL NAVIGATION */}
      <nav className="border-b border-slate-200/50 px-4 sm:px-6 py-4 flex justify-between items-center bg-white/70 backdrop-blur-xl fixed w-full top-0 z-50 transition-all">
        <div className="max-w-[96rem] mx-auto w-full flex justify-between items-center">
          <div className="font-black text-xl tracking-tight text-slate-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
              <Zap className="w-4 h-4 text-white" />
            </div>
            Dispo<span className="text-indigo-600">Router</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/unlock" className="hidden sm:flex text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors items-center gap-1">
              Partner Login
            </Link>
            <Link href="/unlock" className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5">
              Access Vault <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <main className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-500/10 via-cyan-500/5 to-transparent blur-3xl -z-10 rounded-full"></div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center w-full">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-xs font-bold tracking-wide mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEM OPERATIONAL
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-6 max-w-4xl leading-[1.05]">
            The algorithmic disposition <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">engine for real estate.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-500 mb-10 max-w-2xl font-medium leading-relaxed">
            Eliminate manual cross-referencing. Ingest inbound assets and instantly route them to your VIP cash buyers based on strict acquisition algorithms.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/unlock" className="bg-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
              Initialize Pipeline 
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* 2. THE POPULATED LIVE DASHBOARD MOCKUP */}
      <section className="px-4 max-w-5xl mx-auto mb-20 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          className="relative rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Mockup Top Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded-md shadow-sm">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span className="text-[10px] font-mono text-slate-500">api.disporouter.com/v1/match</span>
            </div>
          </div>

          {/* Mockup Data Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50/50 to-white">
            
            {/* Live Feed Column */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-indigo-600" />
                Live Cross-Reference Feed
              </h3>
              
              {mockRoutingFeed.map((deal, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-100">
                      <Building2 className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{deal.address}</p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {deal.id} • {deal.price}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold rounded-md">
                      <CheckCircle2 className="w-3 h-3" /> MATCH: {deal.match}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {deal.time} latency
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Floating Stats Column */}
            <div className="space-y-4">
              <motion.div variants={float} initial="initial" animate="animate" className="bg-slate-900 rounded-xl p-5 shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 blur-2xl rounded-full"></div>
                <h4 className="text-slate-400 text-xs font-bold mb-1 relative z-10">Total Pipeline Processed</h4>
                <p className="text-2xl font-black text-white relative z-10">$14,250,000</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-400 font-mono relative z-10 bg-emerald-500/10 px-2 py-1 rounded w-fit border border-emerald-500/20">
                  <LineChart className="w-3 h-3" /> +24% vs last month
                </div>
              </motion.div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h4 className="text-slate-500 text-xs font-bold mb-1">Active VIP Buyers</h4>
                <p className="text-2xl font-black text-slate-900">124</p>
                <div className="mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-500 font-medium flex items-center justify-between">
                  <span>Engine Status:</span>
                  <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">Listening</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. LOGO MARQUEE / PERFECT INFINITE SCROLL */}
      <section className="border-y border-slate-200 bg-white py-10 overflow-hidden relative">
        {/* Gradient overlays to make the edges fade smoothly */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center mb-8">
          <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Engineered for high-volume disposition desks</p>
        </div>
        
        <div className="flex w-full overflow-hidden">
          <motion.div 
            className="flex min-w-max opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35, repeatType: "loop" }}
          >
            {[...Array(2)].map((_, index) => (
              <div key={index} className="flex gap-16 items-center px-8">
                <div className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tighter"><Building2 className="w-6 h-6"/> APEX ASSETS</div>
                <div className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tighter"><Target className="w-6 h-6"/> MERIDIAN CAP</div>
                <div className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tighter"><Activity className="w-6 h-6"/> HORIZON EQ</div>
                <div className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tighter"><ShieldCheck className="w-6 h-6"/> VANGUARD REALTY</div>
                <div className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tighter"><Server className="w-6 h-6"/> NEXUS HOLDINGS</div>
                <div className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tighter"><Database className="w-6 h-6"/> QUANTUM PROP</div>
                <div className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tighter"><Building2 className="w-6 h-6"/> ELEVATE CAPITAL</div>
                <div className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tighter"><Zap className="w-6 h-6"/> STELLAR PROP</div>
                <div className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tighter"><Database className="w-6 h-6"/> VERTEX ASSETS</div>
                <div className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tighter"><Target className="w-6 h-6"/> OMNI CAPITAL</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. BENTO BOX FEATURE GRID */}
      <section className="py-24 bg-[#FAFAFA] px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Everything you need to scale.</h2>
            <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto font-medium">A complete disposition operating system designed to replace messy spreadsheets with automated, algorithmic routing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
            
            {/* Big Feature 1 */}
            <motion.div variants={fadeUp} className="md:col-span-2 md:row-span-2 bg-slate-900 rounded-3xl p-8 sm:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full transform group-hover:scale-110 transition-transform duration-700"></div>
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 border border-slate-700">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Speed to Lead Pipeline</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                The moment a property hits your system, the engine scans your entire buyer database. It matches budget, minimum square footage, and flood zones in less than 50 milliseconds.
              </p>
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300">
                <span className="text-emerald-400">SUCCESS:</span> 4 matches found for APN-8429. Initiating contact sequence...
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={fadeUp} className="md:col-span-2 bg-indigo-50 rounded-3xl p-8 border border-indigo-100 group hover:bg-indigo-100/50 transition-colors">
              <Target className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-2">Dynamic Buy Boxes</h3>
              <p className="text-slate-600 font-medium">Update your VIP cash buyers' acquisition criteria on the fly. As their strategies pivot, your routing adapts instantly without breaking workflows.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Database className="w-8 h-8 text-slate-900 mb-4" />
              <h3 className="text-lg font-black text-slate-900 mb-2">Centralized Data</h3>
              <p className="text-slate-500 text-sm font-medium">Store all asset and buyer data securely on Neon Serverless Postgres architecture.</p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Workflow className="w-8 h-8 text-slate-900 mb-4" />
              <h3 className="text-lg font-black text-slate-900 mb-2">Future-Proof Ops</h3>
              <p className="text-slate-500 text-sm font-medium">Built on Next.js 16, preparing your pipeline for upcoming Twilio SMS automation.</p>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* 5. COMPARISON / PAIN POINT SECTION */}
      <section className="py-24 bg-white px-4 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900">The old way is costing you deals.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <div className="flex items-center gap-2 text-red-600 font-bold mb-6">
                <X className="w-5 h-5" /> The Spreadsheet Method
              </div>
              <ul className="space-y-4">
                {["Manually cross-referencing buyer criteria.", "Sending generic email blasts to everyone.", "Losing hours to data entry.", "Deals going stale while you filter lists."].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                    <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* The New Way */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-5">
                <Zap className="w-48 h-48 text-indigo-600" />
              </div>
              <div className="flex items-center gap-2 text-indigo-700 font-bold mb-6">
                <CheckCircle2 className="w-5 h-5" /> The DispoRouter Engine
              </div>
              <ul className="space-y-4 relative z-10">
                {["Sub-50ms algorithmic matching.", "Targeted, hyper-relevant buyer alerts.", "Centralized, secure command center.", "First-to-market speed advantage."].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROI / FOOTER CTA */}
      <section className="py-24 bg-slate-900 px-4 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 to-transparent blur-2xl"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">Ready to automate your desk?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">Stop leaving margin on the table due to slow operations. Deploy your bespoke disposition engine today.</p>
          <Link href="/unlock" className="inline-flex items-center gap-2 bg-indigo-500 text-white font-bold text-lg px-10 py-5 rounded-xl hover:bg-indigo-400 transition-all shadow-xl hover:-translate-y-1">
            <Lock className="w-5 h-5" />
            Enter The Vault
          </Link>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-950 py-12 px-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-black text-xl text-white">
            <Zap className="w-5 h-5 text-indigo-500" />
            Dispo<span className="text-indigo-500">Router</span>
          </div>
          <div className="text-slate-500 text-sm font-medium">
            © 2026 Enterprise Disposition Engine. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-bold text-slate-400">
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="/status" className="hover:text-white transition-colors">API Status</Link>
            <Link href="/unlock" className="hover:text-white transition-colors">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}