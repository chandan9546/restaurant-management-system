import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASEURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${BASEURL}/api/my-orders/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [BASEURL, navigate]);

  // Cancel Order
  const handleCancelOrder = (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) {
      return;
    }

    const token = localStorage.getItem("access");

    fetch(`${BASEURL}/api/orders/${orderId}/cancel/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);

        if (data.status === "cancelled") {
          setOrders(
            orders.map((order) =>
              order.id === orderId
                ? {
                    ...order,
                    status: "cancelled",
                  }
                : order
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
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8 text-center">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-16">

            <p className="text-gray-400 text-lg">
              You have not placed any orders yet.
            </p>

            <button
              onClick={() => navigate("/menu")}
              className="mt-5 bg-yellow-600 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg"
            >
              Browse Menu
            </button>

          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(`/my-orders/${order.id}`)}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 cursor-pointer hover:border-yellow-600 transition"
              >

                {/* Order Header */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>
                    <h2 className="text-xl font-semibold">
                      Order #{order.id}
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>

                  <span className="bg-yellow-600 text-black px-4 py-2 rounded-full text-sm font-semibold capitalize">
                    {order.status}
                  </span>

                </div>

                <div className="border-t border-gray-800 my-5"></div>

                {/* Customer Details */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  <div>
                    <p className="text-gray-400 text-sm">
                      Name
                    </p>

                    <p className="mt-1">
                      {order.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Phone
                    </p>

                    <p className="mt-1">
                      {order.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Total Amount
                    </p>

                    <p className="mt-1 text-yellow-500 font-semibold">
                      ₹{Number(order.total_amount).toFixed(2)}
                    </p>
                  </div>

                </div>

                {/* Address */}

                <div className="mt-4">

                  <p className="text-gray-400 text-sm">
                    Delivery Address
                  </p>

                  <p className="mt-1">
                    {order.address}
                  </p>

                </div>

                {/* Cancel Order */}

                {order.status !== "cancelled" &&
                  order.status !== "completed" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelOrder(order.id);
                      }}
                      className="mt-4 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg"
                    >
                      Cancel Order
                    </button>
                  )}

                {/* View Details */}

                <p className="text-yellow-500 text-sm mt-5">
                  Click to view order details →
                </p>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyOrders;