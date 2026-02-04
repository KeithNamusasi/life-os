'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Tree illustration SVG component
function TreeIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="100" cy="100" r="90" fill="#f0fdf4" />
      {/* Trunk */}
      <rect x="90" y="120" width="20" height="60" rx="2" fill="#92400e" />
      {/* Trunk detail */}
      <rect x="95" y="130" width="4" height="8" rx="1" fill="#78350f" opacity="0.5" />
      {/* Leaves - multiple circles */}
      <circle cx="100" cy="80" r="40" fill="#22c55e" />
      <circle cx="75" cy="95" r="25" fill="#16a34a" />
      <circle cx="125" cy="95" r="25" fill="#16a34a" />
      <circle cx="100" cy="55" r="30" fill="#4ade80" />
      {/* Highlight */}
      <circle cx="85" cy="65" r="8" fill="#86efac" opacity="0.6" />
      {/* Ground */}
      <ellipse cx="100" cy="185" rx="60" ry="8" fill="#dcfce7" />
    </svg>
  )
}

// Lock illustration for password
function LockIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#eff6ff" />
      {/* Lock body */}
      <rect x="60" y="80" width="80" height="70" rx="8" fill="#3b82f6" />
      {/* Lock shackle */}
      <path d="M75 80 V60 A25 25 0 0 1 125 60 V80" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" fill="none" />
      {/* Keyhole */}
      <circle cx="100" cy="115" r="10" fill="white" />
      <rect x="96" y="115" width="8" height="20" rx="2" fill="white" />
    </svg>
  )
}

// Mail illustration
function MailIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#f0fdf4" />
      {/* Envelope */}
      <rect x="40" y="60" width="120" height="80" rx="8" fill="white" stroke="#22c55e" strokeWidth="4" />
      {/* Envelope flap */}
      <path d="M40 60 L100 110 L160 60" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Lines */}
      <line x1="55" y1="90" x2="90" y2="90" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
      <line x1="55" y1="110" x2="120" y2="110" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    setLoggingIn(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      setLoggingIn(false)
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  // Show logging in animation
  if (loggingIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="text-center">
          {/* Animated tree */}
          <div className="relative mb-8">
            <div className="w-40 h-40 mx-auto animate-bounce">
              <TreeIllustration className="w-full h-full" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl animate-pulse">🌱</span>
            </div>
          </div>
          
          {/* User name greeting */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Hey {email.split('@')[0]}!
          </h2>
          
          {/* Loading message */}
          <p className="text-gray-600 mb-6 animate-pulse">
            Logging you in...
          </p>
          
          {/* Progress bar */}
          <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-progress"
              style={{ width: '75%' }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative w-full max-w-md p-8">
        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-4">
            <TreeIllustration className="w-full h-full" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Life-OS</h1>
          <p className="text-gray-600 mt-2">Your personal finance operating system</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-6 h-6">
                <LockIllustration className="w-full h-full" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="w-5 h-5">
                    <MailIllustration className="w-full h-full opacity-50" />
                  </div>
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="w-5 h-5">
                    <LockIllustration className="w-full h-full opacity-50" />
                  </div>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white/50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              style={{ animationDelay: '0.3s' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Error Message */}
          {message && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm animate-shake">
              {message}
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/50 text-gray-500">or</span>
            </div>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-green-600 hover:text-green-700 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          By signing in, you agree to our Terms of Service
        </p>
      </div>
    </div>
  )
}
