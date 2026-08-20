import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-100 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md fixed w-full top-0 z-50">
        <div className="font-extrabold text-xl tracking-tight text-gray-900">
          Dispo<span className="text-indigo-600">Router</span>
        </div>
        <Link 
          href="/unlock" 
          className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors"
        >
          Partner Login &rarr;
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-8">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
          Enterprise Disposition Engine
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 max-w-4xl">
          Zero-latency <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">deal routing.</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl font-medium">
          Stop manually cross-referencing spreadsheets. Automatically match inbound property submissions with your buyers' exact acquisition criteria in milliseconds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/unlock" 
            className="bg-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
          >
            Access Pipeline
          </Link>
          <a 
            href="#features" 
            className="bg-white text-gray-700 border border-gray-200 font-bold text-lg px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            How it Works
          </a>
        </div>
      </main>

      {/* Lightweight Feature Highlight */}
      <section id="features" className="py-20 bg-gray-50 border-t border-gray-100 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl">⚡️</div>
            <h3 className="font-bold text-gray-900 mb-2">Speed to Lead</h3>
            <p className="text-gray-500 text-sm">Match properties to buyers instantly. Call your best investors before the competition even opens Excel.</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl">🎯</div>
            <h3 className="font-bold text-gray-900 mb-2">Precision Targeting</h3>
            <p className="text-gray-500 text-sm">Filter by Max Budget, minimum SqFt, and Flood Zone risks to protect your VIP buyer relationships.</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl">🔒</div>
            <h3 className="font-bold text-gray-900 mb-2">Secure Ecosystem</h3>
            <p className="text-gray-500 text-sm">Your cash buyer list is your most valuable asset. Keep it entirely locked down and encrypted.</p>
          </div>
        </div>
      </section>
    </div>
  )
}