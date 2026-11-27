import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

const StaffLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (authError) {
      setError('Incorrect email or password.')
      return
    }

    navigate('/staff/reservations', { replace: true })
  }

  return (
    <section className="min-h-screen bg-[#FAF7F2] px-6 py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-[#C99B52] text-xs tracking-[4px] mb-3">
            HUKBALAJADIA RESTAURANT
          </p>
          <h1 className="text-[#26221E] text-4xl md:text-5xl" style={serif}>
            Staff Login
          </h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-[28px] border border-[#E8E3DB] bg-white px-8 py-10"
        >
          <div className="mb-4">
            <label className="mb-2 block text-xs font-semibold text-[#26221D]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-[#CFCBC5] px-4 py-3 text-sm outline-none focus:border-[#CCA45E]"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-xs font-semibold text-[#26221D]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[#CFCBC5] px-4 py-3 text-sm outline-none focus:border-[#CCA45E]"
            />
          </div>

          {error && (
            <p className="mb-4 rounded-xl bg-[#FBE3E3] px-4 py-3 text-sm text-[#9B2C2C]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#CCA45E] py-3.5 text-sm font-medium text-black transition-colors hover:bg-[#B88D45] disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default StaffLogin