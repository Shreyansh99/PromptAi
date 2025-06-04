'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sparkles,
  Plus,
  BookOpen,
  Star,
  LogOut,
  User,
  CreditCard,
  ChevronDown,
  Coins,
  Menu,
  X
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth({
    redirectTo: '/',
    requireAuth: true
  })
  const [promptInput, setPromptInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tokenData, setTokenData] = useState({
    current: 0,
    max: 7,
    unlimited: false,
    loading: true
  })

  // Fetch token data
  const fetchTokenData = async () => {
    try {
      // Get the current session to include auth token
      const { data: { session } } = await supabase.auth.getSession()

      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      }

      // Add authorization header if session exists
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`
      }

      const response = await fetch('/api/usage', { headers })
      if (response.ok) {
        const data = await response.json()
        setTokenData({
          current: data.tokens.current,
          max: data.tokens.max,
          unlimited: data.tokens.unlimited,
          loading: false
        })
      } else {
        console.error('Failed to fetch token data:', response.status, response.statusText)
        setTokenData(prev => ({ ...prev, loading: false }))
      }
    } catch (error) {
      console.error('Error fetching token data:', error)
      setTokenData(prev => ({ ...prev, loading: false }))
    }
  }

  // Fetch token data on component mount and when user changes
  useEffect(() => {
    if (user && !loading) {
      fetchTokenData()
    }
  }, [user, loading])

  const promptSuggestions = [
    'AI Recognition',
    'Primer',
    'Mastermind',
    'Crafting Video Hooks',
    'Improving Video Scripts',
    'Creating Ideal Customer Profile',
    'Finding Value Propositions',
    'Creating a Brand Identity',
    'Marketing Plan',
    'Copywriting using PAS Framework',
    'Creating a Lesson Outline',
    'Writing an Argumentative Essay'
  ]

  const handlePromptSubmit = async () => {
    if (promptInput.trim()) {
      setSubmitting(true)
      try {
        // Get the current session to include auth token
        const { data: { session } } = await supabase.auth.getSession()

        const headers: HeadersInit = {
          'Content-Type': 'application/json'
        }

        // Add authorization header if session exists
        if (session?.access_token) {
          headers['Authorization'] = `Bearer ${session.access_token}`
        }

        const response = await fetch('/api/optimize', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            raw_prompt: promptInput,
            tone: 'casual'
          })
        })

        const data = await response.json()

        if (response.ok) {
          console.log('Optimized prompt:', data.optimized_prompt)
          console.log('Remaining tokens:', data.remaining_tokens)
          // You can show the optimized prompt in a modal or new section
          alert(`Optimized prompt: ${data.optimized_prompt}`)
          // Refresh token data after successful submission
          fetchTokenData()
        } else {
          alert(`Error: ${data.error}`)
        }
      } catch (error) {
        console.error('Error submitting prompt:', error)
        alert('Failed to optimize prompt. Please try again.')
      } finally {
        setSubmitting(false)
      }
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setPromptInput(suggestion)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600 animate-spin" />
          <span className="text-slate-600">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  // Debug: Show authentication state
  if (!user) {
    console.log('Dashboard: No user found, should redirect to auth')
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center gap-2 justify-center mb-4">
            <Sparkles className="w-6 h-6 text-red-600" />
            <span className="text-slate-600">Authentication required</span>
          </div>
          <p className="text-sm text-slate-500 mb-4">You need to log in to access the dashboard</p>
          <button
            onClick={() => router.push('/auth')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  console.log('Dashboard: User authenticated:', user.email)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Background Pattern - Simplified */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.06),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.04),transparent_60%)]"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139,92,246,0.08) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Responsive */}
      <div className={`fixed left-0 top-0 h-screen w-64 bg-white/95 backdrop-blur-lg border-r border-slate-200/60 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        {/* Logo - Smaller */}
        <div className="p-4 border-b border-slate-200/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-1.5 shadow-sm">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                PromptPilot
              </span>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Navigation - Smaller */}
        <div className="p-4 space-y-2">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
            Workspace
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start text-left h-9 px-3 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-150 rounded-lg"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-md flex items-center justify-center mr-2">
              <Plus className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-sm">New Prompt</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-left h-9 px-3 hover:bg-orange-50 hover:text-orange-700 transition-colors duration-150 rounded-lg"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md flex items-center justify-center mr-2">
              <Star className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-sm">Super Prompts</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-left h-9 px-3 hover:bg-slate-50 hover:text-slate-700 transition-colors duration-150 rounded-lg"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-slate-500 to-slate-600 rounded-md flex items-center justify-center mr-2">
              <BookOpen className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-sm">Saved Prompts</span>
          </Button>
        </div>



        {/* User Profile with Dropdown */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200/60 bg-white/95 backdrop-blur-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full h-auto p-2.5 hover:bg-slate-50 transition-colors duration-150 rounded-lg border border-transparent hover:border-slate-200"
              >
                <div className="flex items-center gap-2.5 w-full">
                  <Avatar className="h-7 w-7 ring-1 ring-slate-200">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium text-xs">
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-xs font-medium text-slate-900 truncate">
                      {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end" side="top">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-slate-900">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                  </p>
                  <p className="text-xs leading-none text-slate-500">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer hover:bg-purple-50 focus:bg-purple-50"
                onClick={() => router.push('/dashboard/pricing')}
              >
                <CreditCard className="mr-2 h-4 w-4 text-purple-600" />
                <span className="text-slate-700">Upgrade to Pro</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
                onClick={() => router.push('/dashboard/account')}
              >
                <User className="mr-2 h-4 w-4 text-slate-600" />
                <span className="text-slate-700">Account</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer hover:bg-red-50 focus:bg-red-50 text-red-600 focus:text-red-600"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen relative z-0">
        {/* Mobile Header */}
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200/60 p-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-1.5 shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              PromptPilot
            </span>
          </div>

          {/* Mobile Token Counter */}
          <button
            onClick={() => router.push('/dashboard/pricing')}
            className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 hover:border-purple-300 rounded-full px-3 py-1.5 shadow-sm transition-all duration-200 group"
            title={tokenData.unlimited ? "Unlimited tokens (Pro plan)" : `${tokenData.current} tokens remaining`}
          >
            <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-purple-600 group-hover:from-purple-600 group-hover:to-purple-700 rounded-full flex items-center justify-center transition-all duration-200">
              <Coins className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-purple-700 group-hover:text-purple-800 text-sm transition-colors">
              {tokenData.loading ? (
                <div className="w-3 h-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              ) : tokenData.unlimited ? (
                '∞'
              ) : (
                tokenData.current
              )}
            </span>
          </button>
        </div>

        <div className="p-4 lg:p-6">
          {/* Header with Token Display - Desktop */}
          <div className="mb-6 lg:mb-10 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-2">
                Welcome back, <span className="text-purple-600">
                  {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}
                </span>
              </h1>
              <p className="text-slate-600">Create your next Perfect prompt</p>
            </motion.div>

            {/* Token Display - Desktop Only */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="hidden lg:flex items-center gap-3"
            >
              {/* Token Counter */}
              <button
                onClick={() => router.push('/dashboard/pricing')}
                className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 hover:border-purple-300 rounded-full px-4 py-2 shadow-sm transition-all duration-200 group"
                title={tokenData.unlimited ? "Unlimited tokens (Pro plan)" : `${tokenData.current} tokens remaining`}
              >
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 group-hover:from-purple-600 group-hover:to-purple-700 rounded-full flex items-center justify-center transition-all duration-200">
                  <Coins className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-semibold text-purple-700 group-hover:text-purple-800 text-sm transition-colors">
                  {tokenData.loading ? (
                    <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : tokenData.unlimited ? (
                    '∞'
                  ) : (
                    tokenData.current
                  )}
                </span>
              </button>

              {/* Theme Toggle Placeholder */}
              <button className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors">
                <span className="text-slate-600">☀️</span>
              </button>
            </motion.div>
          </div>

          {/* Main Prompt Interface */}
          <div className="max-w-3xl mx-auto">
            {/* Central Prompt Card - Professional */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-4 lg:p-8 mb-6 lg:mb-10"
            >
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-lg lg:text-xl font-medium text-slate-900 mb-4 lg:mb-6"
                >
                  I want a prompt for:
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="space-y-4 lg:space-y-6"
                >
                  <div className="relative">
                    <textarea
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      placeholder="writing blog posts"
                      className="w-full h-16 lg:h-20 text-sm lg:text-base py-3 lg:py-4 px-3 lg:px-4 border border-slate-300 bg-white resize-none placeholder:text-slate-400 focus:outline-none rounded-lg"
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handlePromptSubmit()}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    <Button
                      variant="outline"
                      className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 font-medium px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm"
                    >
                      <span className="mr-1 lg:mr-2">🔗</span>
                      AI Amplifier
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-purple-600 border-purple-600 text-white hover:bg-purple-700 hover:border-purple-700 font-medium px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm"
                    >
                      <span className="mr-1 lg:mr-2">✓</span>
                      Primer
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 font-medium px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm"
                    >
                      Mastermind
                    </Button>
                    <Button
                      onClick={handlePromptSubmit}
                      disabled={submitting}
                      className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-2 text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full lg:w-auto lg:ml-auto"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Generating...
                        </>
                      ) : (
                        'Generate Prompt'
                      )}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Prompt Suggestions - Professional */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="space-y-4 lg:space-y-6"
            >
              <div className="text-center">
                <h3 className="text-base lg:text-lg font-medium text-slate-900 mb-2">Popular Templates</h3>
                <p className="text-xs lg:text-sm text-slate-600">Choose a template to get started quickly</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
                {promptSuggestions.slice(0, 6).map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Card
                      className="p-3 lg:p-4 cursor-pointer hover:shadow-sm transition-all duration-200 border-slate-200 hover:border-purple-300 bg-white group"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <CardContent className="p-0">
                        <div className="flex items-center gap-2 lg:gap-3">
                          <div className="w-6 lg:w-8 h-6 lg:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-3 lg:w-4 h-3 lg:h-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-xs lg:text-sm text-slate-900 group-hover:text-purple-700 transition-colors duration-150">
                              {suggestion}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 lg:gap-2 justify-center">
                {promptSuggestions.slice(6).map((suggestion, index) => (
                  <motion.div
                    key={index + 6}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.03 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-2 lg:px-3 py-1 text-xs border-slate-300 text-slate-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 cursor-pointer transition-all duration-200 rounded-md font-normal"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
