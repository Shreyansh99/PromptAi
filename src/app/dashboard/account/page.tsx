'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ArrowLeft, User, Mail, CreditCard, Trash2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

interface UserProfile {
  first_name: string
  last_name: string
  email: string
  subscription: string
}

export default function AccountPage() {
  const router = useRouter()
  const { user, loading } = useAuth({
    redirectTo: '/',
    requireAuth: true
  })
  
  const [profile, setProfile] = useState<UserProfile>({
    first_name: '',
    last_name: '',
    email: '',
    subscription: 'Free'
  })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [message, setMessage] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (user) {
      // Extract user data
      const firstName = user.user_metadata?.full_name?.split(' ')[0] || ''
      const lastName = user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || ''
      
      setProfile({
        first_name: firstName,
        last_name: lastName,
        email: user.email || '',
        subscription: 'Free' // Default to Free, will be updated from database
      })

      // Fetch subscription data from database
      fetchSubscription()
    }
  }, [user])

  const fetchSubscription = async () => {
    if (!user) return

    try {
      // Check if subscriptions table exists and fetch subscription
      const { data, error } = await supabase
        .from('subscriptions')
        .select('plan, status')
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.log('Subscription fetch error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        })

        // Handle different error cases
        if (error.code === 'PGRST116') {
          // No subscription found - create one
          console.log('No subscription found, creating default subscription...')
          await createDefaultSubscription()
        } else if (error.code === 'PGRST202' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
          // Table doesn't exist
          console.log('Subscriptions table does not exist. Please run the database migration.')
          setProfile(prev => ({
            ...prev,
            subscription: 'Free (Table not found)'
          }))
        } else {
          // Other errors
          console.log('Other subscription error, defaulting to Free')
          setProfile(prev => ({
            ...prev,
            subscription: 'Free'
          }))
        }
        return
      }

      // Successfully fetched subscription
      console.log('Subscription fetched successfully:', data)
      setProfile(prev => ({
        ...prev,
        subscription: data?.plan || 'Free'
      }))
    } catch (error) {
      console.error('Unexpected error fetching subscription:', error)
      // Default to Free on any unexpected error
      setProfile(prev => ({
        ...prev,
        subscription: 'Free'
      }))
    }
  }

  const createDefaultSubscription = async () => {
    if (!user) return

    try {
      console.log('Creating default subscription for user:', user.id)
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([
          {
            user_id: user.id,
            plan: 'Free',
            status: 'active'
          }
        ])
        .select()

      if (error) {
        console.log('Error creating default subscription:', {
          code: error.code,
          message: error.message,
          details: error.details
        })
        // Still set to Free even if creation fails
        setProfile(prev => ({
          ...prev,
          subscription: 'Free'
        }))
      } else {
        console.log('Default subscription created successfully:', data)
        // Update the profile with the default subscription
        setProfile(prev => ({
          ...prev,
          subscription: 'Free'
        }))
      }
    } catch (error) {
      console.error('Unexpected error creating default subscription:', error)
      // Still set to Free even if creation fails
      setProfile(prev => ({
        ...prev,
        subscription: 'Free'
      }))
    }
  }

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    setMessage('')

    try {
      // Update user metadata in Supabase Auth
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: `${profile.first_name} ${profile.last_name}`.trim()
        }
      })

      if (error) throw error

      setMessage('Profile updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage('Error updating profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    router.push('/dashboard')
  }

  const handleDeleteAccount = async () => {
    if (!user) return

    setDeleting(true)
    setMessage('')

    try {
      // Call the delete account API route
      const response = await fetch('/api/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete account')
      }

      // Show success message
      setMessage('Your account has been deleted successfully. Redirecting...')

      // Hide the confirmation dialog
      setShowDeleteConfirm(false)

      // Redirect to landing page after a short delay
      setTimeout(() => {
        router.push('/')
      }, 2000)

    } catch (error) {
      console.error('Error deleting account:', error)
      setMessage(`Error deleting account: ${error instanceof Error ? error.message : 'Please try again or contact support.'}`)
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-600">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.06),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.04),transparent_60%)]"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139,92,246,0.08) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="mb-4 hover:bg-slate-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              My Account
            </h1>
            <p className="text-slate-600">
              Please update your profile settings here.
            </p>
          </div>
        </motion.div>

        {/* Account Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                Your Profile
              </CardTitle>
              <CardDescription>
                Please update your profile settings here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.first_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, first_name: e.target.value }))}
                    placeholder="Shreyansh"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.last_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, last_name: e.target.value }))}
                    placeholder="Kumar"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="pl-10 bg-slate-50"
                  />
                </div>
                <p className="text-xs text-slate-500">Email cannot be changed.</p>
              </div>

              {/* Subscription Field */}
              <div className="space-y-2">
                <Label htmlFor="subscription">Account Type</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="subscription"
                    value={profile.subscription}
                    disabled
                    className="pl-10 bg-slate-50"
                  />
                </div>
                <p className="text-xs text-slate-500">Account type cannot be changed.</p>
              </div>

              {/* Message */}
              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.includes('Error') || message.includes('error')
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : message.includes('deleted successfully')
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {message}
                </div>
              )}



              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={deleting || showDeleteConfirm}
                  className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 ml-auto"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Delete Account Modal */}
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-900">
                <span className="text-xl">⚠️</span>
                Delete Account
              </DialogTitle>
              <DialogDescription className="text-red-700 pt-2">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="border-slate-300 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete My Account'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
