'use client'

import { useTransition } from 'react'
import { updateAssetStatus } from './actions'

export default function StatusDropdown({ propertyId, currentStatus }: { propertyId: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition()

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    // startTransition keeps the UI responsive while the server action runs in the background
    startTransition(() => {
      updateAssetStatus(propertyId, newStatus)
    })
  }

  // Dynamic styling based on the current pipeline stage
  const statusStyles: Record<string, string> = {
    PENDING: 'bg-slate-100 text-slate-600 border-slate-200',
    ROUTED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    SOLD: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    REJECTED: 'bg-red-50 text-red-700 border-red-200'
  }

  const currentStyle = statusStyles[currentStatus] || statusStyles.PENDING

  return (
    <div className="relative inline-block">
      <select 
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={isPending}
        className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide border outline-none cursor-pointer appearance-none transition-opacity ${currentStyle} ${isPending ? 'opacity-50 cursor-wait' : 'hover:brightness-95'}`}
      >
        <option value="PENDING">PENDING</option>
        <option value="ROUTED">ROUTED</option>
        <option value="SOLD">SOLD</option>
        <option value="REJECTED">REJECTED</option>
      </select>
      {/* Custom dropdown arrow to hide the ugly default browser arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-1">
        <svg className="w-2 h-2 fill-current opacity-50" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  )
}