import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

const paymentLabels = {
  gcash: 'GCash',
  card: 'Credit / Debit Card',
  cash: 'Pay on Arrival',
}

const Receipt = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    return <Navigate to="/reservation" replace />
  }

  const { fullName, selectedTable, people, date, time, paymentMethod } = state

  const formattedDate = new Date(`${date}T00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  const rows = [
    { label: 'Name', value: fullName },
    { label: 'Table', value: `Table ${selectedTable}` },
    { label: 'Party', value: `${people} ${Number(people) === 1 ? 'guest' : 'guests'}` },
    { label: 'Date & Time', value: `${formattedDate} at ${formattedTime}` },
    { label: 'Payment', value: paymentLabels[paymentMethod] },
  ]

  return (
    <section className="min-h-screen bg-[#FAF7F2] px-6 py-10 md:px-16">
      <div className="mx-auto w-full max-w-3xl">

        <div className="mb-10 text-center">
          <h1 className="text-4xl text-[#26221E] md:text-5xl" style={serif}>
            Reserve Your Table
          </h1>
        </div>

        <div className="rounded-[28px] border border-[#E8E3DB] bg-white px-6 py-10 text-center md:px-12">
          <FaCheckCircle className="mx-auto text-5xl text-[#16B07F]" />

          <h2 className="mt-5 text-3xl text-[#26221E] md:text-4xl" style={serif}>
            Reservation Confirmed
          </h2>

          <span className="mt-4 inline-block rounded-full border border-[#A7E8CF] bg-[#D6F7E8] px-4 py-1 text-xs font-medium text-[#0F6B4C]">
            Confirmed
          </span>

          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-[#FAF7F2] px-6 py-5 text-left">
            {rows.map((row) => (
              <p key={row.label} className="py-1.5 text-sm text-[#26221E]">
                <span className="text-[#A18D76]">{row.label}: </span>
                {row.value}
              </p>
            ))}
          </div>

          <p className="mt-6 text-xs text-[#A18D76]">
            You'll receive a status update as soon as your table is ready.
          </p>

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