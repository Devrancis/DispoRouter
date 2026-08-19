// src/app/page.tsx
import { redirect } from 'next/navigation'

export default function Home() {
  // Instantly redirect the root URL to the dashboard
  redirect('/dashboard')
}