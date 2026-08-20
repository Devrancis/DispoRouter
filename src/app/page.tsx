'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion' 
import { ArrowRight, Zap, Target, Lock, BarChart3, Database } from 'lucide-react'

// Animation variants for clean, staggered reveals
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      
      {/* Navigation */}
      <nav className="border-b border-gray-100 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md fixed w-full top-0 z-50">
        <div className="font-extrabold text-xl tracking-tight text-gray-900">
          Dispo<span className="text-indigo-600">Router</span>
        </div>
        <Link href="/unlock" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-1">
          Partner Login <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col items-center">
          
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Enterprise Disposition Engine v2.0
          </motion.div>
          
          <motion.div variants={fadeUp}>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 max-w-4xl leading-[1.1]">
              Zero-latency <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">deal routing.</span>
            </h1>
          </motion.div>
          
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl font-medium">
            Stop manually cross-referencing spreadsheets. Automatically match inbound property submissions with your buyers' exact acquisition criteria in milliseconds.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/unlock" className="bg-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2">
              Access Pipeline <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

        </motion.div>

        {/* Hero Visual Display */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
          className="mt-20 w-full max-w-5xl relative"
        >
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-indigo-100/40 to-cyan-100/40 blur-3xl -z-10 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl p-4 bg-white border border-gray-100 shadow-2xl">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" alt="Luxury Real Estate" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <span className="text-white font-bold tracking-wide">1. Inbound Assets</span>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" alt="Data Routing Network" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent flex items-end p-6">
                <span className="text-white font-bold tracking-wide">2. Algorithmic Matching</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Feature Grid */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 px-4">
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Engineered for Scale</h2>
            <p className="text-gray-500 mt-2">Everything you need to automate your disposition desk.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Speed to Lead</h3>
              <p className="text-gray-500 leading-relaxed">Match properties to buyers instantly. Call your VIP investors before the competition even opens Excel.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Precision Targeting</h3>
              <p className="text-gray-500 leading-relaxed">Filter matches strictly by Max Budget, minimum SqFt, and Flood Zone risks to protect your relationships.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Dynamic Buy Boxes</h3>
              <p className="text-gray-500 leading-relaxed">Manage your entire roster of cash buyers via the portal. Update their acquisition criteria on the fly.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}