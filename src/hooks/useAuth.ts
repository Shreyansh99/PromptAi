'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface UseAuthOptions {
  redirectTo?: string
  requireAuth?: boolean
}

export function useAuth(options: UseAuthOptions = {}) {
  const { redirectTo = '/', requireAuth = true } = options
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        // First, try to get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('Session error:', sessionError)
          // Don't redirect on session errors, just set user to null
          if (mounted) {
            setUser(null)
            setLoading(false)
          }
          return
        }

        if (session?.user) {
          if (mounted) {
            setUser(session.user)
            setLoading(false)
          }
          return
        }

        // If no session, try getUser as fallback
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError && userError.message !== 'Auth session missing!') {
          console.error('Auth error:', userError)
        }

        if (mounted) {
          setUser(user)

          // Only redirect if we require auth and definitely have no user
          if (!user && requireAuth) {
            router.push(redirectTo)
          }

          setLoading(false)
        }
      } catch (error) {
        console.error('Auth initialization failed:', error)
        if (mounted) {
          setUser(null)
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        console.log('Auth state change:', event, session?.user?.email)

        if (event === 'SIGNED_OUT' || (!session && event !== 'INITIAL_SESSION')) {
          setUser(null)
          if (requireAuth) {
            router.push(redirectTo)
          }
        } else if (session?.user) {
          setUser(session.user)
          setLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [router, redirectTo, requireAuth])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push(redirectTo)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return {
    user,
    loading,
    signOut,
    isAuthenticated: !!user
  }
}
