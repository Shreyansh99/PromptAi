/**
 * Get the base URL for the application
 * In production, use the NEXT_PUBLIC_SITE_URL environment variable
 * In development, fall back to window.location.origin
 */
export function getBaseUrl(): string {
  // For server-side rendering or when NEXT_PUBLIC_SITE_URL is set
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  
  // For client-side in development
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  
  // Fallback for server-side in development
  return 'http://localhost:3000'
}

/**
 * Get the full URL for a given path
 */
export function getFullUrl(path: string): string {
  const baseUrl = getBaseUrl()
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}
