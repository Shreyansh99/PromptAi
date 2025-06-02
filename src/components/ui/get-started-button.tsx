'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface GetStartedButtonProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  asChild?: boolean
}

export function GetStartedButton({
  children,
  className,
  size = 'default',
  variant = 'default',
  ...props
}: GetStartedButtonProps) {
  const router = useRouter()
  const { user, loading } = useAuth({ requireAuth: false })

  const handleClick = async () => {
    if (loading) return // Don't do anything while loading

    try {
      if (user) {
        // User is logged in, redirect to dashboard
        router.push('/dashboard')
      } else {
        // User is not logged in, redirect to auth page
        router.push('/auth')
      }
    } catch (error) {
      console.error('Navigation error:', error)
      // Fallback to auth page if there's any error
      router.push('/auth')
    }
  }

  return (
    <Button
      onClick={handleClick}
      className={cn(className)}
      size={size}
      variant={variant}
      disabled={loading}
      {...props}
    >
      {children}
    </Button>
  )
}
