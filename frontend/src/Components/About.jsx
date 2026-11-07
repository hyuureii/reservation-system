import React from 'react'
import { FaUtensils, FaRegClock, FaMapMarkerAlt } from 'react-icons/fa'
import serv2 from '../assets/serv2.jpg'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

function About() {
  return (
    <section className="bg-[#1A1612] min-h-[450px] flex items-center px-6 md:px-16 py-16">
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
        <div className="flex-1 w-full">
          <img
            src={serv2}
            alt="Hukbalajadia Restaurant dining table"
            className="w-full h-[260px] md:h-[360px] object-cover rounded-[24px]"
          />
        </div>
        <div className="flex-1">
          <p className="text-[#C99B52] text-xs tracking-[4px] mb-4">
            OUR STORY
          </p>

          <h2
            className="text-[#FAF7F2] text-4xl md:text-5xl mb-5"
            style={serif}
          >
            A Taste of Timeless Hospitality
          </h2>

          <p className="text-[#D9D2C8] text-sm md:text-base leading-relaxed max-w-md mb-8">
            At Hukbalajadia, we redefine Filipino dining through an
            exquisite blend of tradition, sophistication, and 
            culinary artistry. Every dish is thoughtfully crafted
            using carefully selected ingredients, bringing together 
            refined flavors and elegant presentation 
            for an unforgettable dining experience.
          </p>

          <ul className="flex flex-col gap-4 text-sm text-[#D9D2C8]">
            <li className="flex items-center gap-3">
              <FaUtensils className="text-[#C99B52]" />
              Exquisite Filipino Cuisine
            </li>
            <li className="flex items-center gap-3">
              <FaRegClock className="text-[#C99B52]" />
              Open daily · 12:00 PM – 9:00 PM
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#C99B52]" />
              East Avenue, Cainta, Rizal
            </li>
          </ul>
        </div>

      </div>
    </section>
  )
}

export default About