import React from 'react'
import serv1 from '../assets/serv1.jpg'
import { useNavigate } from 'react-router-dom'

function Frontbody() {
  const navigate = useNavigate()

  return (
    <section className="bg-[#FAF7F2] min-h-[450px] flex items-center px-6 md:px-16 py-10">
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1">
          <p className="text-[#C99B52] text-xs tracking-[4px] mb-4">
            HUKBALAJADIA RESTAURANT
          </p>
          <h1
            className="text-[#26221E] text-4xl md:text-5xl mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            A table set for you.
          </h1>
          <p className="text-[#756D64] text-sm md:text-base leading-relaxed max-w-md mb-6">
            Filipino dining in the heart of Cainta. Instant booking, secure your seat.
          </p>

          <button
            onClick={() => navigate('/reservation')}
            className="bg-[#CCA45E] hover:bg-[#B88D45] text-black font-medium text-sm px-8 py-4 rounded-full shadow-md transition-colors"
          >
            Make a Reservation
          </button>
        </div>

        <div className="flex-1 w-full">
          <img
            src={serv1}
            className="w-full h-[160px] md:h-[350px] object-cover rounded-[24px]"
          />
        </div>

      </div>
    </section>
  )
}

export default Frontbody
