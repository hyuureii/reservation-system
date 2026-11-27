import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

const statusOptions = ['Reserved', 'Seated', 'Cancelled']

const paymentStyles = {
  Paid: 'bg-[#D6F7E8] text-[#0F6B4C] border-[#A7E8CF]',
  Pending: 'bg-[#FBEFD5] text-[#8A6420] border-[#F0D9A5]',
}

const statusStyles = {
  Reserved: 'border-[#CFCBC5] text-[#26221E]',
  Seated: 'border-[#A7E8CF] bg-[#D6F7E8] text-[#0F6B4C]',
  Cancelled: 'border-[#F0C4C4] bg-[#FBE3E3] text-[#9B2C2C]',
}

const formatTime = (time) =>
  new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

const formatDate = (date) =>
  new Date(`${date}T00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

const StaffReservations = () => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [appliedDate, setAppliedDate] = useState('')

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError('')

      let query = supabase
        .from('reservations')
        .select('*')
        .order('reservation_date', { ascending: true })
        .order('reservation_time', { ascending: true })

      if (appliedDate) {
        query = query.eq('reservation_date', appliedDate)
      }

      const { data, error: dbError } = await query

      if (cancelled) return

      if (dbError) {
        console.error(dbError)
        setError('Could not load reservations.')
      } else {
        setReservations(data)
      }

      setLoading(false)
    }

    load()

    return () => {
      cancelled = true
    }
  }, [appliedDate])

  const handleSearch = (e) => {
    e.preventDefault()
    setAppliedDate(dateInput)
  }

  const handleClear = () => {
    setDateInput('')
    setAppliedDate('')
  }

  const handleStatusChange = async (id, newStatus) => {
    const { error: dbError } = await supabase
      .from('reservations')
      .update({ status: newStatus })
      .eq('id', id)

    if (dbError) {
      console.error(dbError)
      alert(
        dbError.code === '23505'
          ? 'Cannot restore this reservation: the table was booked by someone else for that time.'
          : 'Could not update the status. Please try again.'
      )
      return
    }

    setReservations((current) =>
      current.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    )
  }

  return (
    <section className="min-h-screen bg-[#FAF7F2] px-6 md:px-16 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <p className="text-[#C99B52] text-xs tracking-[4px] mb-3">
            STAFF DASHBOARD
          </p>
          <h1 className="text-[#26221E] text-4xl md:text-5xl" style={serif}>
            Reservations
          </h1>
        </div>

        <form
          onSubmit={handleSearch}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="rounded-xl border border-[#CFCBC5] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#CCA45E]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#CCA45E] px-6 py-2.5 text-sm font-medium text-black shadow-sm transition-colors hover:bg-[#B88D45]"
          >
            Search
          </button>
          {appliedDate && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-full border border-[#CFCBC5] px-6 py-2.5 text-sm text-[#756D64] transition-colors hover:border-[#CCA45E]"
            >
              Show all
            </button>
          )}
        </form>

        {error && (
          <p className="mb-6 rounded-xl bg-[#FBE3E3] px-4 py-3 text-sm text-[#9B2C2C]">
            {error}
          </p>
        )}

        <div className="overflow-x-auto rounded-[24px] border border-[#E8E3DB] bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E8E3DB] text-xs uppercase tracking-[1px] text-[#A18D76]">
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Table</th>
                <th className="px-6 py-4 font-medium">Date / Time</th>
                <th className="px-6 py-4 font-medium">Guests</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-[#A18D76]">
                    Loading...
                  </td>
                </tr>
              ) : reservations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-[#A18D76]">
                    No reservations found.
                  </td>
                </tr>
              ) : (
                reservations.map((r) => (
                  <tr key={r.id} className="border-b border-[#F1EFEC] last:border-b-0">
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#26221E]">{r.customer_name}</p>
                      <p className="text-xs text-[#A18D76]">{r.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-[#756D64]">Table {r.table_id}</td>
                    <td className="px-6 py-4 text-[#756D64]">
                      {formatDate(r.reservation_date)} · {formatTime(r.reservation_time)}
                    </td>
                    <td className="px-6 py-4 text-[#756D64]">{r.guests}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${paymentStyles[r.payment_status] || paymentStyles.Pending}`}
                      >
                        {r.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={r.status}
                        onChange={(e) => handleStatusChange(r.id, e.target.value)}
                        className={`rounded-lg border px-3 py-1.5 text-xs outline-none ${statusStyles[r.status]}`}
                      >
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  )
}

export default StaffReservations