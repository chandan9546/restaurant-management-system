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

  const BASEURL = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login", {
        state: {
          from: "/reservation",
        },
      });
      return;
    }

    if (loading) {
      return;
    }

    if (Number(guests) > 20) {
      alert("Maximum 20 guests are allowed.");
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

    fetch(`${BASEURL}/api/reservations/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Reservation failed"
          );
        }

        return result;
      })
      .then((result) => {
        console.log(result);

        navigate("/reservation-success");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-8">
          Book Your Table
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5"
        >

          {/* Name */}

          <div>
            <label className="block mb-2 text-gray-300">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          {/* Phone */}

          <div>
            <label className="block mb-2 text-gray-300">
              Phone
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          {/* Date */}

          <div>
            <label className="block mb-2 text-gray-300">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          {/* Time */}

          <div>
            <label className="block mb-2 text-gray-300">
              Time
            </label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          {/* Guests */}

          <div>
            <label className="block mb-2 text-gray-300">
              Number of Guests
            </label>

            <input
              type="number"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Enter number of guests"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-black font-semibold py-3 rounded-lg"
          >
            {loading ? "Booking..." : "Book Table"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Reservation;