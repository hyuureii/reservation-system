import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  FaRegCircle,
  FaMobileAlt,
  FaCreditCard,
  FaMoneyBillWave,
} from 'react-icons/fa'

const Fillout = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [requests, setRequests] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('gcash')

  const paymentOptions = [
    {
      id: 'gcash',
      title: 'GCash',
      subtitle: 'Pay via GCash e-wallet',
      icon: <FaMobileAlt size={16} />,
    },
    {
      id: 'card',
      title: 'Credit / Debit Card',
      subtitle: 'Visa, Mastercard, Amex',
      icon: <FaCreditCard size={16} />,
    },
    {
      id: 'cash',
      title: 'Pay on Arrival',
      subtitle: 'Settle the fee at the restaurant',
      icon: <FaMoneyBillWave size={16} />,
    },
  ]
  const handlePay = (e) => {
    e.preventDefault()

    navigate('/receipt', {
      state: {
        ...state,
        fullName,
        phone,
        email,
        requests,
        paymentMethod,
      },
    })
  }

  if (!state) {
    return <Navigate to="/reservation" replace />
  }

  return (
    <section className="min-h-screen bg-[#F4F4F2] px-6 py-10">
      <form
        onSubmit={handlePay}
        className="mx-auto w-full max-w-3xl rounded-[28px] bg-white px-8 py-10 md:px-12"
      >
        <div className="mb-7">
          <h1 className="bookman text-3xl text-[#26221D]">
            Your Details
          </h1>
          <p className="mt-2 text-xs text-[#8C8176]">
            Complete your reservation information
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-xs font-semibold text-[#26221D]">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Customer Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full rounded-xl border border-[#CFCBC5] px-4 py-3 text-sm outline-none focus:border-[#CCA45E]"
          />
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-semibold text-[#26221D]">
              Phone
            </label>
            <input
              type="tel"
              placeholder="+63 917 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full rounded-xl border border-[#CFCBC5] px-4 py-3 text-sm outline-none focus:border-[#CCA45E]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-[#26221D]">
              Email (optional)
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#CFCBC5] px-4 py-3 text-sm outline-none focus:border-[#CCA45E]"
            />
          </div>
        </div>

        <div className="mb-7">
          <label className="mb-2 block text-xs font-semibold text-[#26221D]">
            Special Requests (optional)
          </label>
          <textarea
            rows="3"
            placeholder="Please let us know about food allergies or seating requests..."
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
            className="w-full resize-none rounded-xl border border-[#CFCBC5] px-4 py-4 text-sm outline-none focus:border-[#CCA45E]"
          />
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-xs font-semibold text-[#26221D]">
            Select Payment Method
          </h2>
          <p className="text-xl font-semibold text-[#26221D]">
            ₱50 deposit
          </p>
        </div>

        <div className="mb-7 flex flex-col gap-4">
          {paymentOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setPaymentMethod(option.id)}
              className={`flex w-full items-center justify-between rounded-[20px] border px-5 py-4 text-left transition-colors ${
                paymentMethod === option.id
                  ? 'border-[#CCA45E] bg-[#F8F1E5]'
                  : 'border-[#E8E3DB] bg-white hover:border-[#CCA45E]'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-[#26221D]">
                  {option.icon}
                </span>

                <span>
                  <span className="block text-sm font-semibold text-[#26221D]">
                    {option.title}
                  </span>
                  <span className="mt-1 block text-xs text-[#8C8176]">
                    {option.subtitle}
                  </span>
                </span>
              </span>

              <span className="text-[#CCA45E]">
                {paymentMethod === option.id ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border-[5px] border-[#CCA45E]" />
                ) : (
                  <FaRegCircle size={16} />
                )}
              </span>
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[#E8D2AA] py-4 text-sm font-semibold text-[#26221D] transition-colors hover:bg-[#D9BD8D]"
        >
          Pay
          {paymentMethod === 'gcash' && ' with GCash'}
          {paymentMethod === 'card' && ' by Card'}
          {paymentMethod === 'cash' && ' on Arrival'}
        </button>
      </form>
    </section>
  )
}

export default Fillout