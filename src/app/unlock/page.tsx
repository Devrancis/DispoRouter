import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function UnlockPage() {
  
  async function verifyKey(formData: FormData) {
    'use server'
    const key = formData.get('accessKey')
    
    if (key === process.env.ACCESS_KEY) {
      const cookieStore = await cookies()
      cookieStore.set('dispo_access_token', 'granted', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 48
      })
      redirect('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Restricted Access</h1>
          <p className="text-gray-500 text-sm">Enter your enterprise license key to access the DispoRouter engine.</p>
        </div>

        <form action={verifyKey} className="space-y-4">
          <input 
            type="password" 
            name="accessKey" 
            required 
            placeholder="Enter License Key..."
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-center tracking-widest shadow-sm"
          />
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
          >
            Authenticate &rarr;
          </button>
        </form>
      </div>
    </div>
  )
}