import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaCheckCircle, FaRegClock, FaTimesCircle } from 'react-icons/fa'

const API_URL = import.meta.env.VITE_API_URL
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

const methodLabels = {
  gcash: 'GCash',
  card: 'Credit / Debit Card',
  cash: 'Pay on Arrival',
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

const getView = (r) => {
  if (r.status === 'Cancelled') {
    return {
      Icon: FaTimesCircle,
      iconClass: 'text-[#C0392B]',
      title: 'Reservation Cancelled',
      badge: 'Cancelled',
      badgeClass: 'border-[#F0C4C4] bg-[#FBE3E3] text-[#9B2C2C]',
      note: 'This reservation was cancelled. You are welcome to book another table.',
    }
  }

  if (r.payment_method !== 'cash' && r.payment_status !== 'Paid') {
    return {
      Icon: FaRegClock,
      iconClass: 'text-[#C99B52]',
      title: 'Awaiting Payment',
      badge: 'Pending',
      badgeClass: 'border-[#F0D9A5] bg-[#FBEFD5] text-[#8A6420]',
      note: 'We are waiting for your payment to be confirmed. This page updates automatically.',
    }
  }

  return {
    Icon: FaCheckCircle,
    iconClass: 'text-[#16B07F]',
    title: 'Reservation Confirmed',
    badge: 'Confirmed',
    badgeClass: 'border-[#A7E8CF] bg-[#D6F7E8] text-[#0F6B4C]',
    note:
      r.payment_method === 'cash'
        ? 'Please settle the ₱50 deposit when you arrive at the restaurant.'
        : 'Your deposit has been received. We look forward to seeing you.',
  }
}

const Receipt = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const id = params.get('reservation')

  const [reservation, setReservation] = useState(null)
  const [loadState, setLoadState] = useState('loading')

  useEffect(() => {
    if (!id) {
      setLoadState('notfound')
      return
    }

    let cancelled = false
    let timer
    let attempts = 0

    const load = async () => {
      try {
        const response = await fetch(`${API_URL}/api/reservations/${id}`)
        if (cancelled) return

        if (response.status === 404) {
          setLoadState('notfound')
          return
        }
        if (!response.ok) throw new Error('bad response')

        const data = await response.json()
        if (cancelled) return

        setReservation(data)
        setLoadState('ready')

        const waiting =
          data.payment_method !== 'cash' &&
          data.payment_status === 'Pending' &&
          data.status === 'Reserved'

        if (waiting && attempts < 10) {
          attempts += 1
          timer = setTimeout(load, 3000)
        }
      } catch {
        if (!cancelled) setLoadState('error')
      }
    }

    load()

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [id])

  const view = reservation ? getView(reservation) : null

  const rows = reservation
    ? [
        { label: 'Name', value: reservation.customer_name },
        { label: 'Table', value: `Table ${reservation.table_id}` },
        {
          label: 'Party',
          value: `${reservation.guests} ${reservation.guests === 1 ? 'guest' : 'guests'}`,
        },
        {
          label: 'Date & Time',
          value: `${formatDate(reservation.reservation_date)} at ${formatTime(reservation.reservation_time)}`,
        },
        {
          label: 'Payment',
          value:
            reservation.payment_method === 'cash'
              ? methodLabels.cash
              : `${methodLabels[reservation.payment_method]} · ${reservation.payment_status}`,
        },
      ]
    : []

  return (
    <section className="min-h-screen bg-[#FAF7F2] px-6 py-10 md:px-16">
      <div className="mx-auto w-full max-w-3xl">

        <div className="mb-10 text-center">
          <h1 className="text-4xl text-[#26221E] md:text-5xl" style={serif}>
            Reserve Your Table
          </h1>
        </div>

        <div className="rounded-[28px] border border-[#E8E3DB] bg-white px-6 py-10 text-center md:px-12">
          {loadState === 'loading' && (
            <p className="text-[#A18D76]">Loading your reservation...</p>
          )}

          {loadState === 'notfound' && (
            <>
              <h2 className="text-3xl text-[#26221E]" style={serif}>
                Reservation not found
              </h2>
              <p className="mt-3 text-sm text-[#756D64]">
                We could not find this reservation.
              </p>
            </>
          )}

          {loadState === 'error' && (
            <>
              <h2 className="text-3xl text-[#26221E]" style={serif}>
                Something went wrong
              </h2>
              <p className="mt-3 text-sm text-[#756D64]">
                We could not load your reservation. Please refresh the page.
              </p>
            </>
          )}

          {loadState === 'ready' && reservation && view && (
            <>
              <view.Icon className={`mx-auto text-5xl ${view.iconClass}`} />

              <h2 className="mt-5 text-3xl text-[#26221E] md:text-4xl" style={serif}>
                {view.title}
              </h2>

              <span
                className={`mt-4 inline-block rounded-full border px-4 py-1 text-xs font-medium ${view.badgeClass}`}
              >
                {view.badge}
              </span>

              <div className="mx-auto mt-6 max-w-md rounded-2xl bg-[#FAF7F2] px-6 py-5 text-left">
                {rows.map((row) => (
                  <p key={row.label} className="py-1.5 text-sm text-[#26221E]">
                    <span className="text-[#A18D76]">{row.label}: </span>
                    {row.value}
                  </p>
                ))}
              </div>

              <p className="mt-6 text-xs text-[#A18D76]">{view.note}</p>
            </>
          )}

          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-8 rounded-full bg-[#CCA45E] px-8 py-4 text-sm font-medium text-black shadow-md transition-colors hover:bg-[#B88D45]"
          >
            Back to Home
          </button>
        </div>

      </div>
    </section>
  )
}

export default Receipt