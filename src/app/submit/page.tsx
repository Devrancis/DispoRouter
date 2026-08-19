// src/app/submit/page.tsx
import { submitProperty } from '../actions'

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-zinc-100 font-sans">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">New Property Deal</h1>
          <p className="text-zinc-400 text-sm">Enter deal specs to check for immediate buyer matches.</p>
        </div>

        <form action={submitProperty} className="space-y-5">
          {/* APN */}
          <div>
            <label htmlFor="apn" className="block text-sm font-medium text-zinc-300 mb-1">APN (Parcel Number)</label>
            <input 
              type="text" 
              id="apn" 
              name="apn" 
              required 
              placeholder="e.g. 123-456-789"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Asking Price */}
            <div>
              <label htmlFor="askingPrice" className="block text-sm font-medium text-zinc-300 mb-1">Asking Price ($)</label>
              <input 
                type="number" 
                id="askingPrice" 
                name="askingPrice" 
                required 
                placeholder="100000"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            {/* Square Footage */}
            <div>
              <label htmlFor="sqFt" className="block text-sm font-medium text-zinc-300 mb-1">Square Footage</label>
              <input 
                type="number" 
                id="sqFt" 
                name="sqFt" 
                required 
                placeholder="10000"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Flood Zone */}
          <div>
            <label htmlFor="floodZone" className="block text-sm font-medium text-zinc-300 mb-1">Flood Zone</label>
            <select 
              id="floodZone" 
              name="floodZone" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors appearance-none"
            >
              <option value="X">Zone X (Minimal Risk)</option>
              <option value="X500">Zone X500 (Moderate Risk)</option>
              <option value="AE">Zone AE (High Risk)</option>
            </select>
          </div>

          {/* Seawall Toggle */}
          <div className="flex items-center justify-between py-2 border-t border-b border-zinc-800/50 mt-6">
            <div>
              <p className="text-sm font-medium text-zinc-300">Has Seawall?</p>
              <p className="text-xs text-zinc-500">Required by some premium buyers</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="hasSeawall" className="sr-only peer" />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            className="w-full bg-white text-black font-bold py-3 rounded-lg mt-4 hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            Submit to Dispo Engine &rarr;
          </button>
        </form>
      </div>
    </div>
  )
}