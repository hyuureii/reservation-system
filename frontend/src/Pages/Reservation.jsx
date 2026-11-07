import React, { useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Reservation = () => {
  const navigate = useNavigate()

  const [date, setDate] = useState('')
  const [time, setTime] = useState('12:00')
  const [people, setPeople] = useState('2')
  const [selectedTable, setSelectedTable] = useState(null)

  const tables = [
    { id: 1, seats: 8, area: 'Private Room' },
    { id: 2, seats: 2, area: 'Bar' },
    { id: 3, seats: 6, area: 'Patio' },
    { id: 4, seats: 4, area: 'Main Hall' },
    { id: 5, seats: 4, area: 'Main Hall' },
    { id: 6, seats: 2, area: 'Main Hall' },
    { id: 7, seats: 2, area: 'Window' },
    { id: 8, seats: 2, area: 'Window' },
    { id: 9, seats: 2, area: 'Window' },
  ]

  const handleContinue = () => {
    if (!date) {
      alert('Please select a reservation date.')
      return
    }

    if (!selectedTable) {
      alert('Please choose a table first.')
      return
    }

    const table = tables.find(
      (item) => item.id === selectedTable
    )

    if (!table || Number(people) > table.seats) {
      alert('Please choose a table with enough seats.')
      return
    }

    navigate('/fillout', {
      state: {
        date,
        time,
        people,
        selectedTable,
        tableArea: table.area,
        tableSeats: table.seats,
      },
    })
  }

  return (
    <main className="min-h-screen w-full bg-[#F4F4F2] px-6 py-10 md:px-16">
      <div className="mx-auto w-full max-w-4xl">

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <h1 className="bookman text-4xl text-[#26221D]">
            Reserve Your Table
          </h1>
        </div>

        {/* Date, Time, and Guests */}
        <div className="mb-8 flex flex-wrap items-end justify-center gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#A18D76]">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toLocaleDateString('en-CA')}
              required
              className="rounded border border-[#D5D0C8] bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#A18D76]">
              Time
            </label>

            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="rounded border border-[#D5D0C8] bg-transparent px-3 py-2 text-sm"
            >
              <option value="12:00">12:00 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="17:00">5:00 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="20:00">8:00 PM</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#A18D76]">
              Guests
            </label>

            <select
              value={people}
              onChange={(e) => {
                setPeople(e.target.value)
                setSelectedTable(null)
              }}
              className="rounded border border-[#D5D0C8] bg-transparent px-3 py-2 text-sm"
            >
              <option value="1">1 person</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">4 people</option>
              <option value="5">5 people</option>
              <option value="6">6 people</option>
              <option value="7">7 people</option>
              <option value="8">8 people</option>
            </select>
          </div>
        </div>
        <p className="mb-3 text-sm text-[#A18D76]">
          Choose a Table
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {tables.map((table) => {
            const isSelected = selectedTable === table.id
            const hasEnoughSeats =
              table.seats >= Number(people)

            return (
              <button
                key={table.id}
                type="button"
                disabled={!hasEnoughSeats}
                onClick={() => setSelectedTable(table.id)}
                className={`min-h-[120px] rounded-[24px] border px-6 py-5 text-left shadow-sm transition-colors ${
                  isSelected
                    ? 'border-[#CCA45E] bg-[#F0E5D1]'
                    : hasEnoughSeats
                      ? 'border-[#E8E3DB] bg-[#FCFBF8] hover:border-[#CCA45E]'
                      : 'cursor-not-allowed border-[#E8E3DB] bg-[#EAE7E1] opacity-50'
                }`}
              >
                <h2 className="bookman text-xl font-bold text-[#26221D]">
                  Table {table.id}
                </h2>

                <p className="mt-2 flex items-center gap-2 text-xs text-[#756D64]">
                  <FaUsers size={13} />
                  Seats {table.seats}
                </p>

                <p className="mt-1 text-xs text-[#A18D76]">
                  {table.area}
                </p>
              </button>
            )
          })}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full max-w-[240px] rounded-full bg-[#1C1714] px-6 py-3 text-sm text-white transition-colors hover:bg-[#342B25]"
          >
            Continue
          </button>
        </div>

      </div>
    </main>
  )
}

export default Reservation