import React from 'react'
import Navbar from './Components/Navbar'
import Frontbody from './Components/Frontbody'
import Headlines from './Components/Headlines'
import About from './Components/About'
import Reservation from './Pages/Reservation'
import Fillout from './Pages/Fillout'
import Menu from './Components/Menu'
import Receipt from './Pages/Receipt'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Frontbody />
      <Headlines />
      <About />
      <Menu />
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/fillout" element={<Fillout />} />
        <Route path="/receipt" element={<Receipt />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
