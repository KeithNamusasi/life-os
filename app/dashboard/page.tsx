'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'
import type { Transaction } from '@/types/database'

// Types for our data
interface UserProfile {
  id: string
  phone: string | null
  created_at: string
}

interface DashboardData {
  user: User | null
  profile: UserProfile | null
  transactions: Transaction[]
  loading: boolean
  error: string | null
}

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

// Dollar illustration SVG
function DollarIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#eff6ff" />
      {/* Coin */}
      <circle cx="100" cy="100" r="60" fill="#fbbf24" />
      <circle cx="100" cy="100" r="48" fill="#f59e0b" />
      <text x="100" y="115" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold">$</text>
      {/* Arrow up */}
      <path d="M140 60 L160 40 L180 60" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="160" y1="40" x2="160" y2="90" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}

// Plus illustration SVG
function PlusIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#fef3c7" />
      {/* Plus icon */}
      <rect x="85" y="50" width="30" height="100" rx="8" fill="#f59e0b" />
      <rect x="50" y="85" width="100" height="30" rx="8" fill="#f59e0b" />
    </svg>
  )
}

// Document illustration SVG
function DocumentIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#f3e8ff" />
      {/* Document */}
      <rect x="55" y="40" width="90" height="120" rx="8" fill="white" stroke="#a855f7" strokeWidth="4" />
      {/* Lines */}
      <line x1="70" y1="70" x2="130" y2="70" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
      <line x1="70" y1="90" x2="130" y2="90" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
      <line x1="70" y1="110" x2="110" y2="110" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
      {/* Plus */}
      <circle cx="145" cy="60" r="20" fill="#a855f7" />
      <rect x="140" y="55" width="10" height="30" rx="2" fill="white" />
      <rect x="135" y="60" width="20" height="10" rx="2" fill="white" />
    </svg>
  )
}

// Building illustration SVG
function BuildingIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#dcfce7" />
      {/* Building */}
      <rect x="60" y="50" width="80" height="110" rx="4" fill="#22c55e" />
      {/* Roof */}
      <polygon points="50,50 100,20 150,50" fill="#16a34a" />
      {/* Windows */}
      <rect x="70" y="70" width="20" height="25" rx="2" fill="#bbf7d0" />
      <rect x="110" y="70" width="20" height="25" rx="2" fill="#bbf7d0" />
      <rect x="70" y="105" width="20" height="25" rx="2" fill="#bbf7d0" />
      <rect x="110" y="105" width="20" height="25" rx="2" fill="#bbf7d0" />
      {/* Door */}
      <rect x="85" y="140" width="30" height="40" rx="2" fill="#166534" />
    </svg>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()

  // State for dashboard data
  const [data, setData] = useState<DashboardData>({
    user: null,
    profile: null,
    transactions: [],
    loading: true,
    error: null,
  })

  // State for loading animation
  const [loadingStep, setLoadingStep] = useState(0)

  // Loading steps animation
  useEffect(() => {
    if (data.loading) {
      const interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % 4)
      }, 800)
      return () => clearInterval(interval)
    }
  }, [data.loading])

  // Fetch user data and transactions on mount
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
          router.push('/login')
          return
        }

        // Auto-create user profile if it doesn't exist
        try {
          await supabase.from('life_os.users').insert({
            id: user.id,
            phone: null,
          })
        } catch {
          // Ignore duplicate key errors
        }

        // Fetch user profile
        const { data: profile } = await supabase
          .from('life_os.users')
          .select('*')
          .eq('id', user.id)
          .single()

        // Fetch last 5 transactions
        const { data: transactions } = await supabase
          .from('life_os.transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5)

        setData({
          user,
          profile,
          transactions: transactions || [],
          loading: false,
          error: null,
        })
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load dashboard data',
        }))
      }
    }

    fetchDashboardData()
  }, [router, supabase])

  // Handle sign out
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Error signing out:', error)
    }
    
    router.push('/login')
  }

  // Format currency for display
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount)
  }

  // Format date for display
  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Get user's first name
  function getUserName(): string {
    if (!data.user?.email) return 'there'
    const name = data.user.email.split('@')[0]
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  // Loading screen
  if (data.loading) {
    const loadingMessages = [
      'Growing your financial tree...',
      'Watering your transactions...',
      'Planting your budget seeds...',
      'Almost there!',
    ]

    const illustrations = [
      <TreeIllustration key="tree" className="w-32 h-32 animate-bounce" />,
      <DollarIllustration key="dollar" className="w-32 h-32 animate-pulse" />,
      <TreeIllustration key="tree2" className="w-32 h-32 animate-ping" />,
      <TreeIllustration key="tree3" className="w-32 h-32 animate-spin" />,
    ]

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="text-center">
          {/* Animated tree illustration */}
          <div className="relative mb-8">
            {illustrations[loadingStep]}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl animate-pulse">🌱</span>
            </div>
          </div>
          
          {/* User name greeting */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Hey {getUserName()}!
          </h2>
          
          {/* Loading message */}
          <p className="text-gray-600 mb-6 animate-pulse">
            {loadingMessages[loadingStep]}
          </p>
          
          {/* Progress bar */}
          <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-progress"
              style={{ width: `${((loadingStep + 1) / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (data.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-24 h-24 mx-auto mb-4">
            <TreeIllustration className="w-full h-full opacity-50" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{data.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  // Calculate totals
  const incomeTotal = data.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const expenseTotal = data.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const balance = incomeTotal - expenseTotal

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <TreeIllustration className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Life-OS
              </span>
            </div>

            {/* User info & Sign out */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {getUserName()}
                </p>
                {data.profile?.phone && (
                  <p className="text-xs text-gray-500">{data.profile.phone}</p>
                )}
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-inner">
                <span className="text-green-700 font-medium">
                  {data.user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Welcome back, {getUserName()}!
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Your financial garden is growing.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Income */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-8 h-8">
                  <DollarIllustration className="w-full h-full" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Income</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(incomeTotal)}
                </p>
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-8 h-8">
                  <DollarIllustration className="w-full h-full opacity-70" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expenses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(expenseTotal)}
                </p>
              </div>
            </div>
          </div>

          {/* Balance */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                balance >= 0 
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                  : 'bg-gradient-to-br from-orange-400 to-orange-500'
              }`}>
                <div className="w-8 h-8">
                  <DollarIllustration className="w-full h-full" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Balance</p>
                <p className={`text-2xl font-bold ${
                  balance >= 0 ? 'text-gray-900' : 'text-orange-600'
                }`}>
                  {formatCurrency(balance)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              href="/transactions/new"
              className="group flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 hover:border-green-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <div className="w-8 h-8">
                  <PlusIllustration className="w-full h-full" />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Add Transaction
              </span>
            </Link>

            <Link
              href="/transactions"
              className="group flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <div className="w-8 h-8">
                  <DocumentIllustration className="w-full h-full" />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                All Transactions
              </span>
            </Link>

            <Link
              href="/budgets"
              className="group flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gradient-to-br hover:from-yellow-50 hover:to-yellow-100 hover:border-yellow-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <div className="w-8 h-8">
                  <DollarIllustration className="w-full h-full" />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Budgets
              </span>
            </Link>

            <Link
              href="/businesses"
              className="group flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 hover:border-purple-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <div className="w-8 h-8">
                  <BuildingIllustration className="w-full h-full" />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Businesses
              </span>
            </Link>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <Link
              href="/transactions"
              className="text-sm text-green-600 hover:text-green-700 transition-all duration-200 flex items-center gap-1 group"
            >
              View all 
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>

          {data.transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-32 h-32 mx-auto mb-4">
                <TreeIllustration className="w-full h-full opacity-50" />
              </div>
              <p className="text-gray-500 mb-4 text-lg">No transactions yet</p>
              <p className="text-gray-400 text-sm mb-6">Start planting your financial seeds</p>
              <Link
                href="/transactions/new"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <div className="w-5 h-5">
                  <PlusIllustration className="w-full h-full" />
                </div>
                <span>Add your first transaction</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {data.transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`group flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 hover:-translate-x-1 cursor-pointer animate-fade-in-up`}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    {/* Type indicator with illustration */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${
                      transaction.type === 'income' 
                        ? 'bg-gradient-to-br from-green-400 to-green-500' 
                        : 'bg-gradient-to-br from-red-400 to-red-500'
                    }`}>
                      <div className="w-6 h-6">
                        <DollarIllustration className="w-full h-full" />
                      </div>
                    </div>

                    {/* Transaction details */}
                    <div>
                      <p className="font-semibold text-gray-900 capitalize">
                        {transaction.category}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          transaction.source === 'whatsapp' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {transaction.source === 'whatsapp' ? 'WhatsApp' : 'Web'}
                        </span>
                        • {formatDate(transaction.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <span className={`font-bold text-lg ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Number(transaction.amount))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative py-8 text-center text-gray-500 text-sm">
        <div className="w-8 h-8 mx-auto mb-2">
          <TreeIllustration className="w-full h-full opacity-30" />
        </div>
        <p>Built for your financial freedom</p>
      </footer>
    </div>
  )
}
