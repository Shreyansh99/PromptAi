'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RazorpayCheckout } from './RazorpayCheckout'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

interface PaymentButtonProps {
  plan: string
  amount: number
  className?: string
  children?: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function PaymentButton({ 
  plan, 
  amount, 
  className, 
  children,
  variant = 'default'
}: PaymentButtonProps) {
  const { user, loading: authLoading } = useAuth({ requireAuth: false })
  const router = useRouter()
  const [currentPlan, setCurrentPlan] = useState<string>('Free')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchCurrentPlan()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchCurrentPlan = async () => {
    try {
      const response = await fetch('/api/user/status')
      if (response.ok) {
        const data = await response.json()
        if (data.authenticated && data.subscription) {
          setCurrentPlan(data.subscription.plan || 'Free')
        } else {
          setCurrentPlan('Free')
        }
      } else {
        // If API fails, assume Free plan
        console.log('User status API failed, assuming Free plan')
        setCurrentPlan('Free')
      }
    } catch (error) {
      console.error('Error fetching current plan:', error)
      // If error, assume Free plan
      setCurrentPlan('Free')
    } finally {
      setLoading(false)
    }
  }

  const handleSuccess = () => {
    // Refresh the page or redirect to dashboard
    router.refresh()
    router.push('/dashboard')
  }

  const handleError = (error: string) => {
    console.error('Payment error:', error)
  }

  // Show loading state
  if (authLoading || loading) {
    return (
      <Button disabled className={className} variant={variant}>
        Loading...
      </Button>
    )
  }

  // If user is not logged in, redirect to auth
  if (!user) {
    return (
      <Button 
        onClick={() => router.push('/auth')}
        className={className}
        variant={variant}
      >
        {children || 'Sign In to Upgrade'}
      </Button>
    )
  }

  // If user is already on this plan
  if (currentPlan === plan) {
    return (
      <Button disabled className={className} variant={variant}>
        Current Plan
      </Button>
    )
  }

  // If user is on a higher plan (shouldn't happen with current setup)
  if (currentPlan === 'Pro' && plan === 'Free') {
    return (
      <Button disabled className={className} variant={variant}>
        Current Plan
      </Button>
    )
  }

  // Show payment button
  return (
    <RazorpayCheckout
      amount={amount}
      userId={user.id}
      plan={plan}
      userEmail={user.email || ''}
      userName={user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
      onSuccess={handleSuccess}
      onError={handleError}
      className={className}
    >
      {children || `Upgrade to ${plan}`}
    </RazorpayCheckout>
  )
}
