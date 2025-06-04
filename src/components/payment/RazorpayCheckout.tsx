'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface RazorpayCheckoutProps {
  amount: number
  userId: string
  plan: string
  userEmail: string
  userName: string
  onSuccess?: () => void
  onError?: (error: string) => void
  children?: React.ReactNode
  className?: string
  disabled?: boolean
}

// TypeScript interfaces for Razorpay
interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: Record<string, unknown>;
}

interface RazorpayFailureResponse {
  error: RazorpayError;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
  };
  notes: {
    userId: string;
    plan: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: RazorpayFailureResponse) => void) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export function RazorpayCheckout({
  amount,
  userId,
  plan,
  userEmail,
  userName,
  onSuccess,
  onError,
  children,
  className,
  disabled = false
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    try {
      setLoading(true)

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK')
      }

      // Create order
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          userId,
          plan
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      // Validate Razorpay key
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
      if (!razorpayKey) {
        throw new Error('Razorpay key not configured')
      }

      // Configure Razorpay options
      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'PromptPilot',
        description: `${plan} Plan Subscription`,
        order_id: orderData.order.id,
        handler: async function (response: RazorpayResponse) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId
              }),
            })

            const verifyData = await verifyResponse.json()

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Payment verification failed')
            }

            toast({
              title: 'Payment Successful!',
              description: `Welcome to ${plan} plan! Your subscription is now active.`,
            })

            onSuccess?.()
          } catch (error) {
            console.error('Payment verification error:', error)
            const errorMessage = error instanceof Error ? error.message : 'Payment verification failed'
            toast({
              title: 'Payment Verification Failed',
              description: errorMessage,
              variant: 'destructive',
            })
            onError?.(errorMessage)
          }
        },
        prefill: {
          name: userName,
          email: userEmail,
        },
        notes: {
          userId,
          plan,
        },
        theme: {
          color: '#167d7f',
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          }
        }
      }

      const rzp = new window.Razorpay(options)
      
      rzp.on('payment.failed', function (response: RazorpayFailureResponse) {
        console.error('Payment failed:', response.error)
        toast({
          title: 'Payment Failed',
          description: response.error.description || 'Payment could not be processed',
          variant: 'destructive',
        })
        onError?.(response.error.description || 'Payment failed')
        setLoading(false)
      })

      rzp.open()

    } catch (error) {
      console.error('Payment initiation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to initiate payment'
      toast({
        title: 'Payment Error',
        description: errorMessage,
        variant: 'destructive',
      })
      onError?.(errorMessage)
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || loading}
      className={className}
    >
      {loading ? 'Processing...' : children || `Pay ₹${amount}`}
    </Button>
  )
}
