'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Auth callback started')
        console.log('Current URL:', window.location.href)
        console.log('Search params:', window.location.search)
        console.log('Hash params:', window.location.hash)

        // First, try to handle the auth callback from URL
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Session error:', error)
          setStatus('error')
          setMessage('Authentication failed. Please try again.')
          return
        }

        if (data.session) {
          console.log('Existing session found:', data.session.user.email)
          setStatus('success')
          setMessage('Successfully signed in! Redirecting to dashboard...')

          // Redirect immediately for existing sessions
          setTimeout(() => router.push('/dashboard'), 1000)
          return
        }

        // If no session, check URL parameters for auth tokens
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const searchParams = new URLSearchParams(window.location.search)

        // Check both hash and search params for tokens
        const accessToken = hashParams.get('access_token') || searchParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token')
        const type = hashParams.get('type') || searchParams.get('type')
        const code = searchParams.get('code')

        if (code) {
          console.log('OAuth code found, exchanging for session...')
          // Handle OAuth code exchange
          const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)

          if (sessionError) {
            console.error('Code exchange error:', sessionError)
            setStatus('error')
            setMessage('Failed to complete authentication. Please try again.')
            return
          }

          if (sessionData.session) {
            console.log('OAuth session created successfully:', sessionData.session.user.email)
            setStatus('success')
            setMessage('Successfully signed in! Redirecting to dashboard...')
            setTimeout(() => router.push('/dashboard'), 1000)
            return
          }
        } else if (accessToken && refreshToken) {
          console.log('Access token found, setting session...')
          // Handle token-based auth (email confirmation)
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })

          if (sessionError) {
            console.error('Session error:', sessionError)
            setStatus('error')
            setMessage('Failed to establish session. Please try signing in again.')
            return
          }

          if (sessionData.session) {
            console.log('Token session created successfully:', sessionData.session.user.email)
            setStatus('success')
            setMessage(type === 'signup' ? 'Email confirmed successfully! Redirecting to dashboard...' : 'Successfully signed in! Redirecting to dashboard...')
            setTimeout(() => router.push('/dashboard'), 1000)
            return
          }
        }

        // Check for error parameters
        const authError = hashParams.get('error') || searchParams.get('error')
        const errorDescription = hashParams.get('error_description') || searchParams.get('error_description')

        if (authError) {
          console.error('Auth error from URL:', authError, errorDescription)
          setStatus('error')
          setMessage(errorDescription || 'Authentication failed.')
        } else {
          console.error('No valid auth parameters found in URL')
          setStatus('error')
          setMessage('Invalid authentication link. Please try signing in again.')
        }
      } catch (error) {
        console.error('Callback error:', error)
        setStatus('error')
        setMessage('An unexpected error occurred.')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 flex items-center justify-center p-4 relative overflow-hidden -mt-16 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.12),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.08),transparent_60%)]"></div>
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139,92,246,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/80 backdrop-blur-xl border border-purple-100/50 shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              {status === 'loading' && (
                <div className="bg-blue-100 w-full h-full rounded-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              )}
              {status === 'success' && (
                <div className="bg-green-100 w-full h-full rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-100 w-full h-full rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
              )}
            </div>
            
            <CardTitle className="text-xl font-bold">
              {status === 'loading' && 'Confirming your email...'}
              {status === 'success' && 'Email Confirmed!'}
              {status === 'error' && 'Confirmation Failed'}
            </CardTitle>
            
            <CardDescription className="text-slate-600">
              {message}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center">
            {status === 'error' && (
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/auth">
                    Back to Sign In
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">
                    Go to Homepage
                  </Link>
                </Button>
              </div>
            )}
            
            {status === 'success' && (
              <p className="text-sm text-slate-500">
                You will be redirected automatically in a few seconds...
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
