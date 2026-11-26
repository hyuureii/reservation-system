import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

const methodLabels = {
  gcash: 'GCash',
  card: 'Credit / Debit Card',
}

const formatDate = (date) =>
  new Date(`${date}T00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

const formatTime = (time) =>
  new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const MockPayment = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const id = params.get('reservation')

  const [reservation, setReservation] = useState(null)
  const [loadState, setLoadState] = useState('loading')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) {
      setLoadState('unavailable')
      return
    }

    let cancelled = false

    const load = async () => {
      try {
        const response = await fetch(`${API_URL}/api/reservations/${id}`)
        if (cancelled) return

        if (!response.ok) {
          setLoadState('unavailable')
          return
        }

        const data = await response.json()
        if (cancelled) return

        setReservation(data)
        setLoadState(
          data.status === 'Reserved' && data.payment_status === 'Pending'
            ? 'ready'
            : 'unavailable'
        )
      } catch {
        if (!cancelled) setLoadState('unavailable')
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [id])

  const handlePay = async () => {
    setBusy(true)
    setError('')

    try {
      await wait(1500)

      const response = await fetch(`${API_URL}/api/mock-payment/${id}/pay`, {
        method: 'POST',
      })

      if (response.status === 409) {
        setLoadState('unavailable')
        setBusy(false)
        return
      }

      if (!response.ok) {
        setError('Something went wrong. Please try again.')
        setBusy(false)
        return
      }

      navigate(`/receipt?reservation=${id}`)
    } catch {
      setError('Could not reach the server. Please try again.')
      setBusy(false)
    }
  }

  const handleCancel = async () => {
    setBusy(true)

    try {
      await fetch(`${API_URL}/api/mock-payment/${id}/cancel`, { method: 'POST' })
    } catch {
      setError('Could not reach the server.')
    }

    navigate('/reservation')
  }

  return (
    <section className="min-h-screen bg-[#FAF7F2] px-6 py-10 md:px-16">
      <div className="mx-auto w-full max-w-md">

        <div className="mb-8 text-center">
          <p className="text-[#C99B52] text-xs tracking-[4px]">
            HUKBALAJADIA RESTAURANT
          </p>
        </div>

        <div className="rounded-[28px] border border-[#E8E3DB] bg-white px-8 py-10 text-center">
          {loadState === 'loading' && (
            <p className="text-[#A18D76]">Loading...</p>
          )}

          {loadState === 'unavailable' && (
            <>
              <h1 className="text-3xl text-[#26221E]" style={serif}>
                Payment unavailable
              </h1>
              <p className="mt-3 text-sm text-[#756D64]">
                This payment session has expired or was already completed.
              </p>
              <Link
                to="/reservation"
                className="mt-6 inline-block rounded-full bg-[#CCA45E] px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-[#B88D45]"
              >
                Book a table
              </Link>
            </>
          )}

          {loadState === 'ready' && reservation && (
            <>
              <h1 className="text-3xl text-[#26221E]" style={serif}>
                Confirm Payment
              </h1>
              <p className="mt-2 text-sm text-[#756D64]">
                Pay with {methodLabels[reservation.payment_method]}
              </p>

              <p className="mt-6 text-4xl font-semibold text-[#26221E]">₱50.00</p>
              <p className="text-xs text-[#A18D76]">Reservation deposit</p>

              <div className="mt-6 rounded-2xl bg-[#FAF7F2] px-5 py-4 text-left text-sm text-[#26221E]">
                <p className="py-1">
                  <span className="text-[#A18D76]">Table: </span>
                  Table {reservation.table_id}
                </p>
                <p className="py-1">
                  <span className="text-[#A18D76]">Date: </span>
                  {formatDate(reservation.reservation_date)}
                </p>
                <p className="py-1">
                  <span className="text-[#A18D76]">Time: </span>
                  {formatTime(reservation.reservation_time)}
                </p>
              </div>

              {error && (
                <p className="mt-4 rounded-xl bg-[#FBE3E3] px-4 py-3 text-sm text-[#9B2C2C]">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handlePay}
                disabled={busy}
                className="mt-6 w-full rounded-full bg-[#CCA45E] py-3.5 text-sm font-medium text-black transition-colors hover:bg-[#B88D45] disabled:opacity-60"
              >
                {busy ? 'Processing payment...' : 'Pay ₱50.00'}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={busy}
                className="mt-3 w-full rounded-full border border-[#CFCBC5] py-3.5 text-sm text-[#756D64] transition-colors hover:border-[#CCA45E] disabled:opacity-60"
              >
                Cancel
              </button>
            </>
          )}
        </div>

      </div>
    </section>
  )
}

export default MockPayment
