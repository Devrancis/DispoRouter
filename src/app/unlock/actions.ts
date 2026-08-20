'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function verifyKey(prevState: { error: string } | null, formData: FormData) {
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
  
  // If the key doesn't match, return an error state
  return { error: 'Invalid license key. Please try again.' }
}