/**
 * Get the base URL for the application
 * In production, use the NEXT_PUBLIC_SITE_URL environment variable
 * In development, fall back to window.location.origin
 */
export function getBaseUrl(): string {
  // Priority 1: Explicitly set NEXT_PUBLIC_SITE_URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL.trim()
    console.log('Using NEXT_PUBLIC_SITE_URL:', url)
    return url
  }

  // Priority 2: Vercel deployment URL
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    const url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    console.log('Using NEXT_PUBLIC_VERCEL_URL:', url)
    return url
  }

  // Priority 3: For client-side, use current origin (but avoid localhost in production)
  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    console.log('Using window.location.origin:', origin)

    // If we're in production but still seeing localhost, something is wrong
    if (process.env.NODE_ENV === 'production' && origin.includes('localhost')) {
      console.error('CRITICAL: Production environment detected but using localhost URL. Please set NEXT_PUBLIC_SITE_URL environment variable.')
      // In production, if we detect localhost, try to use a reasonable fallback
      if (process.env.VERCEL_URL) {
        const fallbackUrl = `https://${process.env.VERCEL_URL}`
        console.warn('Using VERCEL_URL as fallback:', fallbackUrl)
        return fallbackUrl
      }
    }
    return origin
  }

  // Priority 4: Server-side fallback
  if (process.env.NODE_ENV === 'production') {
    // In production server-side, we should have environment variables set
    console.error('CRITICAL: No base URL available in production server-side context. Please set NEXT_PUBLIC_SITE_URL.')
    // Last resort: try VERCEL_URL without NEXT_PUBLIC prefix
    if (process.env.VERCEL_URL) {
      const fallbackUrl = `https://${process.env.VERCEL_URL}`
      console.warn('Using VERCEL_URL as last resort fallback:', fallbackUrl)
      return fallbackUrl
    }
    // If all else fails, return a placeholder that will cause obvious errors
    return 'https://MISSING-SITE-URL-ENV-VAR.com'
  }

  // Development fallback
  return 'http://localhost:3000'
}

/**
 * Get the full URL for a given path
 */
export function getFullUrl(path: string): string {
  const baseUrl = getBaseUrl()
  const fullUrl = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
  console.log(`getFullUrl: ${path} -> ${fullUrl}`)
  return fullUrl
}
