import React from 'react'
import Headline1 from '../assets/Headline1.png'
import Headline2 from '../assets/Headline2.png'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

const Headlines = () => {

  return (
    <section className="bg-[#FAF7F2] border-t border-[#E8E3DB] px-6 md:px-16 py-16">
      <div className="max-w-6xl w-full mx-auto">

        <div className="text-center mb-14">
          <p className="text-[#C99B52] text-xs tracking-[4px] mb-4">
            RESERVATION PROCESS
          </p>
          <h1
            className="text-[#26221E] text-4xl md:text-5xl mb-4"
            style={serif}
          >
            Quick & Easy Reservations
          </h1>
          <p className="text-[#756D64] text-sm md:text-base">
            Book your table in just a few clicks.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
          <div className="flex-1">
            <p className="text-[#C99B52] text-xs tracking-[4px] mb-4">
              STEP 01
            </p>
            <h2
              className="text-[#26221E] text-3xl md:text-4xl mb-4"
              style={serif}
            >
              Choose your table
            </h2>
            <p className="text-[#756D64] text-sm md:text-base leading-relaxed max-w-md">
              Pick your date, time, and number of guests, then select the
              table that suits you best.
            </p>
          </div>

          <div className="flex-1 w-full">
            <img
              src={Headline1}
              alt="Reservation table selection page"
              className="w-full object-cover rounded-[24px] shadow-md"
            />
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="flex-1 w-full">
            <img
              src={Headline2}
              alt="Customer details and payment page"
              className="w-full object-cover rounded-[24px] shadow-md"
            />
          </div>

          <div className="flex-1">
            <p className="text-[#C99B52] text-xs tracking-[4px] mb-4">
              STEP 02
            </p>
            <h2
              className="text-[#26221E] text-3xl md:text-4xl mb-4"
              style={serif}
            >
              Confirm your booking
            </h2>
            <p className="text-[#756D64] text-sm md:text-base leading-relaxed max-w-md mb-6">
              Enter your details and pay the deposit to secure your seat.
              You will get an instant confirmation.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Headlines