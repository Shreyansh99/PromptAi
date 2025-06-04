import { useState, useEffect, useCallback } from 'react'

interface TokenData {
  current: number
  max: number
  unlimited: boolean
  loading: boolean
  plan: {
    name: string
    display_name: string
    is_unlimited: boolean
  }
  canMakeRequest: boolean
}

export function useTokens() {
  const [tokenData, setTokenData] = useState<TokenData>({
    current: 0,
    max: 7,
    unlimited: false,
    loading: true,
    plan: {
      name: 'free',
      display_name: 'Free',
      is_unlimited: false
    },
    canMakeRequest: false
  })

  const fetchTokenData = useCallback(async () => {
    try {
      setTokenData(prev => ({ ...prev, loading: true }))
      const response = await fetch('/api/usage')

      if (response.ok) {
        const data = await response.json()
        setTokenData({
          current: data.tokens.current,
          max: data.tokens.max,
          unlimited: data.tokens.unlimited,
          loading: false,
          plan: data.plan,
          canMakeRequest: data.canMakeRequest
        })
      } else {
        setTokenData(prev => ({ ...prev, loading: false }))
      }
    } catch (error) {
      console.error('Error fetching token data:', error)
      setTokenData(prev => ({ ...prev, loading: false }))
    }
  }, [])

  const refreshTokens = () => {
    fetchTokenData()
  }

  return {
    tokenData,
    refreshTokens,
    fetchTokenData
  }
}
