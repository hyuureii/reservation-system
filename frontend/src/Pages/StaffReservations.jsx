import React, { useState } from 'react'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

const initialReservations = [
  { id: 1, customer: 'Andrei Balajadia', table: 1, date: '2026-11-07', time: '17:30', guests: 2, payment: 'Confirmed', status: 'Reserved' },
  { id: 2, customer: 'Emmanuel Fernandez', table: 2, date: '2026-11-07', time: '19:30', guests: 2, payment: 'Pending', status: 'Reserved' },
  { id: 3, customer: 'Aarron Clark Diaz', table: 3, date: '2026-11-08', time: '19:30', guests: 6, payment: 'Confirmed', status: 'Reserved' },
  { id: 4, customer: 'Renzo Demain', table: 4, date: '2026-11-05', time: '20:00', guests: 4, payment: 'Confirmed', status: 'Seated' },
  { id: 5, customer: 'Alizza Nicole Bravo', table: 5, date: '2026-11-08', time: '12:00', guests: 4, payment: 'Confirmed', status: 'Reserved' },
  { id: 6, customer: 'Benjamin Harold Delape', table: 6, date: '2026-11-09', time: '18:00', guests: 8, payment: 'Pending', status: 'Cancelled' },
  { id: 7, customer: 'Kerstain Faith Abdulla', table: 7, date: '2026-11-06', time: '13:00', guests: 2, payment: 'Confirmed', status: 'Reserved' },
  { id: 8, customer: 'Alexandra Mertz San Juan', table: 8, date: '2026-11-08', time: '19:00', guests: 2, payment: 'Confirmed', status: 'Reserved' },
]
const statusOptions = ['Reserved', 'Seated', 'Cancelled']

const paymentStyles = {
  Confirmed: 'bg-[#D6F7E8] text-[#0F6B4C] border-[#A7E8CF]',
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
  const [reservations, setReservations] = useState(initialReservations)
  const [dateInput, setDateInput] = useState('')
  const [appliedDate, setAppliedDate] = useState('')

  const visible = appliedDate
    ? reservations.filter((r) => r.date === appliedDate)
    : reservations

  const handleSearch = (e) => {
    e.preventDefault()
    setAppliedDate(dateInput)
  }

  const handleClear = () => {
    setDateInput('')
    setAppliedDate('')
  }

  const handleStatusChange = (id, newStatus) => {
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
              {visible.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-[#A18D76]">
                    No reservations for this date.
                  </td>
                </tr>
              ) : (
                visible.map((r) => (
                  <tr key={r.id} className="border-b border-[#F1EFEC] last:border-b-0">
                    <td className="px-6 py-4 font-medium text-[#26221E]">{r.customer}</td>
                    <td className="px-6 py-4 text-[#756D64]">Table {r.table}</td>
                    <td className="px-6 py-4 text-[#756D64]">
                      {formatDate(r.date)} · {formatTime(r.time)}
                    </td>
                    <td className="px-6 py-4 text-[#756D64]">{r.guests}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${paymentStyles[r.payment]}`}
                      >
                        {r.payment}
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