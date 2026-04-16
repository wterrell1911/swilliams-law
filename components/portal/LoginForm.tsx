"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LogoIcon } from "@/components/ui/Logo"

function LoginFormInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/portal/dashboard"

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        router.push(redirect)
        router.refresh()
      } else {
        setError(data.error || "Invalid credentials")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-warmWhite/80 mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-12 px-4 rounded-lg bg-navy-800 border border-navy-600 text-warmWhite placeholder:text-warmWhite/40 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-warmWhite/80 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 rounded-lg bg-navy-800 border border-navy-600 text-warmWhite placeholder:text-warmWhite/40 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
          required
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing in...
          </span>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  )
}

export function LoginForm() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LogoIcon />
          </div>
          <h1 className="text-2xl font-display font-bold text-warmWhite">
            Admin Portal
          </h1>
          <p className="text-warmWhite/60 text-sm mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="bg-navy-900 border border-navy-700 rounded-xl p-8">
          <Suspense fallback={<div className="h-48 animate-pulse bg-navy-800 rounded-lg" />}>
            <LoginFormInner />
          </Suspense>
        </div>

        <p className="text-center text-warmWhite/40 text-xs mt-6">
          {/* TODO: Phase 3 — read from firmConfig.identity.shortName */}
        </p>
      </div>
    </div>
  )
}
