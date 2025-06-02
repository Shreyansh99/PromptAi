'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Search,
  Settings,
  LogOut,
  Zap,
  Lightbulb,
  User,
  CreditCard,
  ChevronDown
} from 'lucide-react'

export default function DashboardPage() {
  const { user, loading, signOut, isAuthenticated } = useAuth({
    redirectTo: '/',
    requireAuth: true
  })
  const [promptInput, setPromptInput] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
        // Here you would call your prompt optimization API
        console.log('Submitting prompt:', promptInput)
        // For now, just simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error('Error submitting prompt:', error)
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

      {/* Sidebar - Smaller and Simpler */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white/95 backdrop-blur-lg border-r border-slate-200/60 shadow-lg z-10">
        {/* Logo - Smaller */}
        <div className="p-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-1.5 shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              PromptPilot
            </span>
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
              <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 focus:bg-purple-50">
                <CreditCard className="mr-2 h-4 w-4 text-purple-600" />
                <span className="text-slate-700">Upgrade to Pro</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50">
                <User className="mr-2 h-4 w-4 text-slate-600" />
                <span className="text-slate-700">Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50">
                <Settings className="mr-2 h-4 w-4 text-slate-600" />
                <span className="text-slate-700">Settings</span>
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
      <div className="ml-64 min-h-screen relative z-0">
        <div className="p-6">
          {/* Header - Professional */}
          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                Welcome back, <span className="text-purple-600">
                  {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}
                </span>
              </h1>
              <p className="text-slate-600">Create your next Perfect prompt</p>
            </motion.div>
          </div>

          {/* Main Prompt Interface */}
          <div className="max-w-3xl mx-auto">
            {/* Central Prompt Card - Professional */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-8 mb-10"
            >
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-xl font-medium text-slate-900 mb-6"
                >
                  I want a prompt for:
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="relative">
                    <textarea
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      placeholder="writing blog posts"
                      className="w-full h-20 text-base py-4 px-4 border border-slate-300 bg-white resize-none placeholder:text-slate-400 focus:outline-none rounded-lg"
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handlePromptSubmit()}
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 font-medium px-4 py-2"
                    >
                      <span className="mr-2">🔗</span>
                      AI Amplifier
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-purple-600 border-purple-600 text-white hover:bg-purple-700 hover:border-purple-700 font-medium px-4 py-2"
                    >
                      <span className="mr-2">✓</span>
                      Primer
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 font-medium px-4 py-2"
                    >
                      Mastermind
                    </Button>
                    <Button
                      onClick={handlePromptSubmit}
                      disabled={submitting}
                      className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
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
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-lg font-medium text-slate-900 mb-2">Popular Templates</h3>
                <p className="text-sm text-slate-600">Choose a template to get started quickly</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                      className="p-4 cursor-pointer hover:shadow-sm transition-all duration-200 border-slate-200 hover:border-purple-300 bg-white group"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <CardContent className="p-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-slate-900 group-hover:text-purple-700 transition-colors duration-150">
                              {suggestion}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
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
                      className="px-3 py-1 text-xs border-slate-300 text-slate-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 cursor-pointer transition-all duration-200 rounded-md font-normal"
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
