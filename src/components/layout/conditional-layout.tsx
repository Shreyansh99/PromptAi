'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Check if current path is dashboard or auth related
  const isDashboardPage = pathname?.startsWith('/dashboard')
  const isAuthPage = pathname?.startsWith('/auth')

  // Dashboard pages: No navbar and no footer
  if (isDashboardPage) {
    return (
      <main>
        {children}
      </main>
    )
  }

  // Auth pages: No navbar and no footer (they have their own layout)
  if (isAuthPage) {
    return <main>{children}</main>
  }

  // All other pages: Show navbar and footer
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  )
}
