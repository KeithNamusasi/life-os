'use client'

import Link from 'next/link'

// Tree illustration SVG
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

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="text-center p-8">
        {/* 404 illustration */}
        <div className="w-48 h-48 mx-auto mb-8">
          <TreeIllustration className="w-full h-full opacity-60" />
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Oops! Looks like this page got lost in the garden. 
          Let&apos;s get you back on track.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>Go to Dashboard</span>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
          >
            <span>Go to Login</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
