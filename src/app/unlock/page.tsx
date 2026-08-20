import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function UnlockPage() {
  
  async function verifyKey(formData: FormData) {
    'use server'
    const key = formData.get('accessKey')
    
    if (key === process.env.ACCESS_KEY) {
      // 1. Await the cookies object first 
      const cookieStore = await cookies()
      
      // 2. Set the cookie
      cookieStore.set('dispo_access_token', 'granted', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 48 
      })
      
      redirect('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Restricted Access</h1>
          <p className="text-gray-400 text-sm">Enter your enterprise license key to access the DispoRouter engine.</p>
        </div>

        <form action={verifyKey} className="space-y-4">
          <input 
            type="password" 
            name="accessKey" 
            required 
            placeholder="Enter License Key..."
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-center tracking-widest"
          />
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-500 transition-colors shadow-lg"
          >
            Authenticate &rarr;
          </button>
        </form>
      </div>
    </div>
  )
}