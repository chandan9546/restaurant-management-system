import React from 'react'

const ReservationSuccess = () => {
  return (
    <section className="bg-[#0F0F0F] min-h-screen text-white flex items-center justify-center">
      
      <div className="bg-[#1A1A1A] p-10 rounded-xl text-center">
        
        <h1 className="text-4xl font-bold text-[#C89B3C]">
          Booking Successful
        </h1>

        <p className="text-gray-400 mt-4">
          Your table has been booked successfully.
        </p>

        <p className="text-gray-400 mt-2">
          Thank you for choosing Royal Rasoi.
        </p>

      </div>

    </section>
  );
}

export default ReservationSuccess;