import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaRegCalendarCheck, FaUsers } from 'react-icons/fa'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

const tabClass = ({ isActive }) =>
  `flex items-center gap-2 px-2 py-4 text-sm border-b-2 transition-colors ${
    isActive
      ? 'border-[#CCA45E] text-[#26221E] font-semibold'
      : 'border-transparent text-[#A18D76] hover:text-[#26221E]'
  }`

const StaffNavbar = () => {
  return (
    <header>
      <div className="w-full h-20 flex justify-center items-center bg-[#26211D]">
        <h1 className="text-[#FAF7F2] text-2xl tracking-[1px]" style={serif}>
          Hukbalajadia Restaurant
        </h1>
      </div>

      <nav className="bg-[#FAF7F2] border-b border-[#E8E3DB] px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex gap-8">
          <NavLink to="/staff/reservations" className={tabClass}>
            <FaRegCalendarCheck />
            Reservations
          </NavLink>
          <NavLink to="/staff/management" className={tabClass}>
            <FaUsers />
            Staff Management
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default StaffNavbar