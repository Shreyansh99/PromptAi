'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Something went wrong</h2>
            <p className="text-slate-600 mb-6">
              We encountered an error. Please try refreshing the page.
            </p>
            <button
              onClick={this.resetError}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
