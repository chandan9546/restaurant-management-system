import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyReservations() {
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASEURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${BASEURL}/api/my-reservations/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }

        return response.json();
      })
      .then((data) => {
        setReservations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [BASEURL, navigate]);

  // Cancel Reservation
  const handleCancelReservation = (reservationId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );

    if (!confirmCancel) {
      return;
    }

    const token = localStorage.getItem("access");

    fetch(
      `${BASEURL}/api/reservations/${reservationId}/cancel/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);

        if (data.status === "cancelled") {
          setReservations(
            reservations.map((reservation) =>
              reservation.id === reservationId
                ? {
                    ...reservation,
                    status: "cancelled",
                    cancelled_by: "customer",
                    cancelled_at: data.cancelled_at,
                  }
                : reservation
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p>Loading reservations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-8">
          My Reservations
        </h1>

        {reservations.length === 0 ? (
          <div className="text-center py-16">

            <p className="text-gray-400 text-lg">
              You have no reservations yet.
            </p>

            <button
              onClick={() => navigate("/reservation")}
              className="mt-5 bg-yellow-600 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold"
            >
              Book a Table
            </button>

          </div>
        ) : (
          <div className="space-y-6">

            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6"
              >

                {/* Reservation Header */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>
                    <h2 className="text-xl font-semibold">
                      Reservation #{reservation.id}
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                      Booked on{" "}
                      {new Date(
                        reservation.created_at
                      ).toLocaleString()}
                    </p>
                  </div>

                  <span className="bg-yellow-600 text-black px-4 py-2 rounded-full text-sm font-semibold capitalize">
                    {reservation.status}
                  </span>

                </div>

                <div className="border-t border-gray-800 my-5"></div>

                {/* Customer Details */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <p className="text-gray-400 text-sm">
                      Name
                    </p>

                    <p className="mt-1">
                      {reservation.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Phone
                    </p>

                    <p className="mt-1">
                      {reservation.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Reservation Date
                    </p>

                    <p className="mt-1">
                      {reservation.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Reservation Time
                    </p>

                    <p className="mt-1">
                      {reservation.time}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Number of Guests
                    </p>

                    <p className="mt-1">
                      {reservation.guests}
                    </p>
                  </div>

                </div>

                {/* Cancellation Information */}

                {reservation.status === "cancelled" && (
                  <div className="mt-5 bg-red-950 border border-red-800 rounded-lg p-4">

                    <p className="text-red-400 font-semibold">
                      Reservation Cancelled
                    </p>

                    <p className="text-gray-300 text-sm mt-2">
                      Cancelled By:{" "}
                      <span className="capitalize">
                        {reservation.cancelled_by || "Customer"}
                      </span>
                    </p>

                    {reservation.cancelled_at && (
                      <p className="text-gray-400 text-sm mt-1">
                        Cancelled At:{" "}
                        {new Date(
                          reservation.cancelled_at
                        ).toLocaleString()}
                      </p>
                    )}

                  </div>
                )}

                {/* Cancel Reservation Button */}

                {reservation.status !== "cancelled" &&
                  reservation.status !== "completed" && (
                    <button
                      onClick={() =>
                        handleCancelReservation(
                          reservation.id
                        )
                      }
                      className="mt-5 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-semibold cursor-pointer"
                    >
                      Cancel Reservation
                    </button>
                  )}

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyReservations;