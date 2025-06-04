'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useTokens } from '@/hooks/useTokens'




export function UsageTracker() {
  const router = useRouter()
  const { tokenData, fetchTokenData } = useTokens()

  useEffect(() => {
    fetchTokenData()
  }, [fetchTokenData])

  if (tokenData.loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 rounded mb-2"></div>
            <div className="h-4 bg-slate-200 rounded mb-2"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { current, max, unlimited, plan, canMakeRequest } = tokenData

  // For unlimited plans, show as full
  const tokenPercentage = unlimited
    ? 100
    : (current / max) * 100

  const isLowTokens = !unlimited && current <= 1
  const isOutOfTokens = !unlimited && current === 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Tokens ({plan.display_name})</span>
          {isOutOfTokens && (
            <Badge variant="destructive">No Tokens</Badge>
          )}
          {isLowTokens && !isOutOfTokens && (
            <Badge variant="outline">Low Tokens</Badge>
          )}
          {unlimited && (
            <Badge variant="default">Unlimited</Badge>
          )}
        </CardTitle>
        <CardDescription>
          {unlimited
            ? 'Unlimited prompt generations'
            : 'Track your available tokens for prompt optimization'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Token Usage */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Available Tokens</span>
            <span className="text-sm text-slate-600">
              {unlimited ? '∞' : `${current} / ${max}`}
            </span>
          </div>
          {!unlimited && (
            <Progress
              value={tokenPercentage}
              className={`h-2 ${isLowTokens ? 'bg-red-100' : 'bg-slate-100'}`}
            />
          )}
          {!unlimited && (
            <p className="text-xs text-slate-500 mt-1">
              {plan.name === 'free'
                ? 'Free users get 1 token per day (max 7 tokens)'
                : 'Unlimited tokens per day'
              }
            </p>
          )}
        </div>

        {/* Free Plan Info */}
        {plan.name === 'free' && (
          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded">
            <p className="font-medium mb-1">Free Plan Benefits:</p>
            <ul className="space-y-1">
              <li>• 7 bonus tokens on signup</li>
              <li>• 1 token per day after that</li>
              <li>• Limited algorithms</li>
            </ul>
          </div>
        )}

        {/* Upgrade prompt for free users */}
        {plan.name === 'free' && (isLowTokens || !canMakeRequest) && (
          <div className="pt-2 border-t">
            <p className="text-xs text-slate-600 mb-2">
              Need more prompts? Upgrade to Pro for unlimited access.
            </p>
            <Button
              size="sm"
              onClick={() => router.push('/dashboard/pricing')}
              className="w-full"
            >
              Upgrade to Pro - $8.33/month
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Hook for checking if user can make requests
export function useCanMakeRequest() {
  const [canMakeRequest, setCanMakeRequest] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUsage = async () => {
      try {
        const response = await fetch('/api/usage')
        if (response.ok) {
          const data = await response.json()
          setCanMakeRequest(data.canMakeRequest)
        }
      } catch (error) {
        console.error('Error checking usage:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUsage()
  }, [])

  return { canMakeRequest, loading }
}
