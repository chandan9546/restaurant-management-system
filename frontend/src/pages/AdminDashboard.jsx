import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASEURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${BASEURL}/api/admin-dashboard/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load dashboard"
          );
        }

        return data;
      })
      .then((data) => {
        setDashboard(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  }, [BASEURL, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-red-400 text-lg">
            {error}
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-5 bg-yellow-600 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="mb-10">
          <p className="text-yellow-500 uppercase text-sm">
            Admin Panel
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your restaurant orders and reservations.
          </p>

          {/* Manage Menu Button */}

          <button
            onClick={() => navigate("/admin-menu")}
            className="mt-5 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold px-5 py-3 rounded-lg"
          >
            Manage Menu
          </button>
        </div>


        {/* Order Statistics */}

        <h2 className="text-2xl font-semibold mb-5">
          Orders
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400">
              Total Orders
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {dashboard.orders.total}
            </h3>
          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400">
              Pending
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {dashboard.orders.pending}
            </h3>
          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400">
              Confirmed
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {dashboard.orders.confirmed}
            </h3>
          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400">
              Completed
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {dashboard.orders.completed}
            </h3>
          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400">
              Cancelled
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {dashboard.orders.cancelled}
            </h3>
          </div>

        </div>


        {/* Reservation Statistics */}

        <h2 className="text-2xl font-semibold mt-12 mb-5">
          Reservations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400">
              Total Reservations
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {dashboard.reservations.total}
            </h3>
          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400">
              Pending
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {dashboard.reservations.pending}
            </h3>
          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400">
              Confirmed
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {dashboard.reservations.confirmed}
            </h3>
          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400">
              Completed
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {dashboard.reservations.completed}
            </h3>
          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400">
              Cancelled
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {dashboard.reservations.cancelled}
            </h3>
          </div>

        </div>


        {/* Revenue */}

        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-xl p-6">

          <p className="text-gray-400">
            Total Revenue
          </p>

          <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            ₹{Number(dashboard.revenue).toFixed(2)}
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Revenue from confirmed and completed orders
          </p>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;