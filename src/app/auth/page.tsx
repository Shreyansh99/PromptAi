'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react'
import { GoogleLogo } from '@/components/ui/google-logo'
import { getFullUrl } from '@/lib/utils/url'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) {
          if (error.message.includes('Email not confirmed')) {
            setError('Please check your email and click the confirmation link before signing in.')
          } else {
            setError(error.message)
          }
          throw error
        }
        router.push('/dashboard')
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: getFullUrl('/auth/callback'),
          },
        })

        if (error) throw error

        if (data.user && !data.session) {
          setEmailSent(true)
          setError('')
        } else if (data.session) {
          router.push('/dashboard')
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      if (!errorMessage.includes('Email not confirmed')) {
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendConfirmation = async () => {
    setResendLoading(true)
    setError('')
    setResendSuccess(false)
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: getFullUrl('/auth/callback'),
        },
      })
      if (error) throw error
      setResendSuccess(true)
      setTimeout(() => setResendSuccess(false), 3000)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setError(errorMessage)
    } finally {
      setResendLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setLoading(true)
    setError('')
    try {
      const redirectUrl = getFullUrl('/auth/callback')
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      if (error) throw error
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setError(`OAuth Error: ${errorMessage}`)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 flex items-center justify-center p-4 relative overflow-hidden -mt-16 pt-20">
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(139,92,246,0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-xl" />
        <div className="absolute bottom-32 right-40 w-24 h-24 bg-gradient-to-br from-pink-400/35 to-purple-400/35 rounded-full blur-lg" />
        <div className="absolute top-1/3 right-12 w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-lg" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-2">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              PromptPilot
            </span>
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl font-black text-slate-900 mb-2"
          >
            {isLogin ? 'Welcome Back!' : 'Join PromptPilot'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600"
          >
            {isLogin
              ? 'Sign in to continue your AI journey'
              : 'Start creating amazing AI prompts today'}
          </motion.p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="bg-white/80 backdrop-blur-xl border border-purple-100/50 shadow-2xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl font-bold text-center">
                {emailSent ? 'Email Confirmation' : isLogin ? 'Sign In' : 'Create Account'}
              </CardTitle>
              <CardDescription className="text-center text-slate-600">
                {emailSent
                  ? 'Please check your email to complete registration'
                  : isLogin
                  ? 'Enter your credentials to access your account'
                  : 'Fill in your details to get started'}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {emailSent ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Check your email
                  </h3>
                  <p className="text-slate-600 text-sm">
                    We&apos;ve sent a confirmation link to <strong>{email}</strong>.
                    Click it to activate your account.
                  </p>
                  {resendSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 text-green-600 px-3 py-2 rounded-lg text-sm"
                    >
                      Confirmation email sent successfully!
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleResendConfirmation}
                      disabled={resendLoading}
                    >
                      {resendLoading ? 'Resending...' : 'Resend confirmation email'}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-purple-600 hover:text-purple-700"
                      onClick={() => {
                        setEmailSent(false)
                        setIsLogin(true)
                        setError('')
                      }}
                    >
                      Back to sign in
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleAuth}
                    disabled={loading}
                  >
                    <GoogleLogo className="mr-2" size={18} />
                    Continue with Google
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-slate-500">
                        Or continue with email
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    {!isLogin && (
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading
                        ? isLogin
                          ? 'Signing In...'
                          : 'Creating Account...'
                        : isLogin
                        ? 'Sign In'
                        : 'Create Account'}
                    </Button>
                  </form>

                  <div className="text-center pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-600">
                      {isLogin ? "Don't have an account?" : 'Already have an account?'}
                      <button
                        type="button"
                        onClick={() => {
                          setIsLogin(!isLogin)
                          setError('')
                          setPassword('')
                          setConfirmPassword('')
                          setEmailSent(false)
                        }}
                        className="ml-1 text-purple-600 hover:text-purple-700 font-semibold"
                      >
                        {isLogin ? 'Sign up' : 'Sign in'}
                      </button>
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-8 text-sm text-slate-500"
        >
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-purple-600 hover:text-purple-700">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-purple-600 hover:text-purple-700">
            Privacy Policy
          </Link>.
        </motion.div>
      </div>
    </div>
  )
}
