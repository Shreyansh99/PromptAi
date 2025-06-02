/**
 * Get the base URL for the application
 * In production, use the NEXT_PUBLIC_SITE_URL environment variable
 * In development, fall back to window.location.origin
 */
export function getBaseUrl(): string {
  // Priority 1: Explicitly set NEXT_PUBLIC_SITE_URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  // Priority 2: Vercel deployment URL
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  // Priority 3: For client-side, use current origin (but avoid localhost in production)
  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    // If we're in production but still seeing localhost, something is wrong
    if (process.env.NODE_ENV === 'production' && origin.includes('localhost')) {
      console.warn('Production environment detected but using localhost URL. Please set NEXT_PUBLIC_SITE_URL.')
    }
    return origin
  }

  // Priority 4: Fallback for server-side in development
  return 'http://localhost:3000'
}

/**
 * Get the full URL for a given path
 */
export function getFullUrl(path: string): string {
  const baseUrl = getBaseUrl()
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}
