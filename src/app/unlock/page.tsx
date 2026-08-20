'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { verifyKey } from './actions'

// Extracted button component to use the pending status
function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-12"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Verifying...
        </span>
      ) : (
        'Authenticate ➔'
      )}
    </button>
  )
}

export default function UnlockPage() {
  const [state, formAction] = useActionState(verifyKey, null)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8 text-center">
        <div className="mb-6">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Restricted Access</h1>
          <p className="text-gray-500 text-sm">Enter your enterprise license key to access the matching engine.</p>
        </div>

        {/* Display the error message if the server action returns one */}
        {state?.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium animate-pulse">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input 
            type="password" 
            name="accessKey" 
            required 
            placeholder="Enter License Key..."
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-center tracking-widest shadow-sm"
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  )
}