import React from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import StaffNavbar from './Components/StaffNavbar'
import Frontbody from './Components/Frontbody'
import Headlines from './Components/Headlines'
import Menu from './Components/Menu'
import About from './Components/About'
import Reservation from './Pages/Reservation'
import Fillout from './Pages/Fillout'
import Receipt from './Pages/Receipt'
import StaffReservations from './Pages/StaffReservations'

const Home = () => {
  return (
    <>
      <Frontbody />
      <Headlines />
      <Menu />
      <About />
    </>
  )
}
const CustomerLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
const StaffLayout = () => {
  return (
    <>
      <StaffNavbar />
      <Outlet />
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/fillout" element={<Fillout />} />
          <Route path="/receipt" element={<Receipt />} />
        </Route>

        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<Navigate to="reservations" replace />} />
          <Route path="reservations" element={<StaffReservations />} />
          <Route
            path="management"
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App