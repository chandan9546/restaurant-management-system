import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Reservation() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

     if (loading) {
    return;
  }

  setLoading(true);

    const data = {
      name: name,
      phone: phone,
      date: date,
      time: time,
      guests: guests,
    };

    fetch("http://127.0.0.1:8000/api/reservations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate("/reservation-success");
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong");
        setLoading(false);
      });
  };

  return (
    <section className="bg-[#0F0F0F] min-h-screen py-20 text-white">
      <div className="max-w-2xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center">
          Book a Table
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1A1A1A] p-6 rounded-xl mt-10"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 bg-white text-black rounded"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 mb-4 bg-white text-black rounded"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 mb-4 bg-white text-black rounded"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 mb-4 bg-white text-black rounded"
          />

          <input
            type="number"
            placeholder="Number of Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full p-3 mb-4 bg-white text-black rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C89B3C] text-black py-3 rounded font-semibold"
          >
            {loading ? "Booking..." : "Book Table"}
          </button>
        </form>

      </div>
    </section>
  );
}

export default Reservation;