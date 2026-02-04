'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Tree illustration SVG component
function TreeIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#f0fdf4" />
      <rect x="90" y="120" width="20" height="60" rx="2" fill="#92400e" />
      <rect x="95" y="130" width="4" height="8" rx="1" fill="#78350f" opacity="0.5" />
      <circle cx="100" cy="80" r="40" fill="#22c55e" />
      <circle cx="75" cy="95" r="25" fill="#16a34a" />
      <circle cx="125" cy="95" r="25" fill="#16a34a" />
      <circle cx="100" cy="55" r="30" fill="#4ade80" />
      <circle cx="85" cy="65" r="8" fill="#86efac" opacity="0.6" />
      <ellipse cx="100" cy="185" rx="60" ry="8" fill="#dcfce7" />
    </svg>
  )
}

// User illustration SVG
function UserIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#f0fdf4" />
      {/* Head */}
      <circle cx="100" cy="70" r="30" fill="#22c55e" />
      {/* Body */}
      <path d="M50 170 Q50 120 100 120 Q150 120 150 170" fill="#22c55e" />
    </svg>
  )
}

// Mail illustration
function MailIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#f0fdf4" />
      <rect x="40" y="60" width="120" height="80" rx="8" fill="white" stroke="#22c55e" strokeWidth="4" />
      <path d="M40 60 L100 110 L160 60" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

// Phone illustration
function PhoneIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#f0fdf4" />
      {/* Phone body */}
      <rect x="70" y="40" width="60" height="120" rx="10" fill="#22c55e" />
      {/* Screen */}
      <rect x="75" y="50" width="50" height="90" rx="4" fill="white" />
      {/* Home button */}
      <circle cx="100" cy="150" r="5" fill="white" opacity="0.5" />
      {/* WhatsApp-style chat bubbles */}
      <path d="M40 140 L60 140 L55 160 L40 155 Z" fill="#22c55e" />
      <circle cx="50" cy="135" r="5" fill="#22c55e" />
    </svg>
  )
}

// Lock illustration
function LockIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#f0fdf4" />
      <rect x="60" y="80" width="80" height="70" rx="8" fill="#22c55e" />
      <path d="M75 80 V60 A25 25 0 0 1 125 60 V80" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="115" r="10" fill="white" />
      <rect x="96" y="115" width="8" height="20" rx="2" fill="white" />
    </svg>
  )
}

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [signingUp, setSigningUp] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    setSigningUp(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage(error.message)
      setSigningUp(false)
    } else if (data.user) {
      // Create user profile in life_os.users
      await supabase.from('life_os.users').insert({
        id: data.user.id,
        phone: phone || null,
      })
      setMessage('Account created! Check your email to confirm.')
      setTimeout(() => router.push('/login'), 2000)
    }
    setLoading(false)
  }

  // Show signing up animation
  if (signingUp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-40 h-40 mx-auto animate-bounce">
              <TreeIllustration className="w-full h-full" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl animate-pulse">🌱</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Hey {email.split('@')[0]}!
          </h2>
          
          <p className="text-gray-600 mb-6 animate-pulse">
            Creating your account...
          </p>
          
          <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
              style={{ width: '60%' }}
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
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative w-full max-w-md p-8">
        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-4">
            <TreeIllustration className="w-full h-full" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Join Life-OS</h1>
          <p className="text-gray-600 mt-2">Start growing your financial garden</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-6 h-6">
                <UserIllustration className="w-full h-full" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Create account</h2>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
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
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 bg-white/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone (for WhatsApp)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="w-5 h-5">
                    <PhoneIllustration className="w-full h-full opacity-50" />
                  </div>
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+254700000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 bg-white/50"
                />
              </div>
            </div>

            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 bg-white/50"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              style={{ animationDelay: '0.4s' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          {/* Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm animate-fade-in ${
              message.includes('created') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/50 text-gray-500">or</span>
            </div>
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Already have an account?{' '}
            <Link href="/login" className="text-green-600 hover:text-green-700 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          By signing up, you agree to our Terms of Service
        </p>
      </div>
    </div>
  )
}
