'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 15 }} // New page starts slightly lower and invisible
      animate={{ opacity: 1, y: 0 }}   // New page glides up and fades in
      transition={{ 
        duration: 0.35, 
        ease: [0.33, 1, 0.68, 1], // Custom 'circOut' cubic-bezier
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}