// src/app/submit/page.tsx
import { submitProperty } from '../actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8">
        <div className="mb-8 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Pipeline
            </Link>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Submit New Deal
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base font-medium">
            Enter property details below to instantly cross-reference against active cash buyers.
          </p>
        </div>

        <form action={submitProperty} className="space-y-5">
          <div>
            <label htmlFor="apn" className="block text-sm font-semibold text-gray-700 mb-1">APN (Parcel Number)</label>
            <input 
              type="text" 
              id="apn" 
              name="apn" 
              required 
              placeholder="e.g. 123-456-789"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 sm:py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm text-base"
            />
          </div>

          {/* Stacks to 1 column on mobile, 2 columns on screens sm and up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4">
            <div>
              <label htmlFor="askingPrice" className="block text-sm font-semibold text-gray-700 mb-1">Asking Price ($)</label>
              <input 
                type="number" 
                id="askingPrice" 
                name="askingPrice" 
                required 
                placeholder="100000"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 sm:py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm text-base"
              />
            </div>

            <div>
              <label htmlFor="sqFt" className="block text-sm font-semibold text-gray-700 mb-1">Square Footage</label>
              <input 
                type="number" 
                id="sqFt" 
                name="sqFt" 
                required 
                placeholder="10000"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 sm:py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm text-base"
              />
            </div>
          </div>

          <div>
            <label htmlFor="floodZone" className="block text-sm font-semibold text-gray-700 mb-1">Flood Zone</label>
            <select 
              id="floodZone" 
              name="floodZone" 
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 sm:py-2.5 text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm appearance-none text-base"
            >
              <option value="X">Zone X (Minimal Risk)</option>
              <option value="X500">Zone X500 (Moderate Risk)</option>
              <option value="AE">Zone AE (High Risk)</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mt-6">
            <div>
              <p className="text-sm font-semibold text-gray-700">Has Seawall?</p>
              <p className="text-xs text-gray-500">Required by some premium buyers</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="hasSeawall" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white font-bold py-3.5 sm:py-3 rounded-lg mt-4 hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg text-base"
          >
            Run Match Engine &rarr;
          </button>
        </form>
      </div>
    </div>
  )
}