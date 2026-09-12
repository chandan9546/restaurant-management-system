import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
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
          throw new Error("Failed to fetch order");
        }

        return response.json();
      })
      .then((data) => {
        const foundOrder = data.find((item) => item.id === Number(orderId));

        setOrder(foundOrder);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [orderId, BASEURL, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p>Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
        <p className="text-gray-400">Order not found.</p>

        <button
          onClick={() => navigate("/my-orders")}
          className="mt-5 bg-yellow-600 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg"
        >
          Back to My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/my-orders")}
          className="text-yellow-500 hover:text-yellow-400 mb-6"
        >
          ← Back to My Orders
        </button>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Order #{order.id}</h1>

              <p className="text-gray-400 mt-2">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            <span className="bg-yellow-600 text-black px-4 py-2 rounded-full font-semibold capitalize">
              {order.status}
            </span>
          </div>

          <div className="border-t border-gray-800 my-6"></div>

          <h2 className="text-xl font-semibold mb-4">Customer Details</h2>

          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <p className="text-gray-400 text-sm">Name</p>

              <p className="mt-1">{order.name}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Phone</p>

              <p className="mt-1">{order.phone}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Total Amount</p>

              <p className="mt-1 text-yellow-500 font-semibold">
                ₹{Number(order.total_amount).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-gray-400 text-sm">Delivery Address</p>

            <p className="mt-1">{order.address}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Ordered Items</h2>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.menu_item.name}</p>

                    <p className="text-gray-400 text-sm mt-1">
                      ₹{Number(item.price).toFixed(2)} × {item.quantity}
                    </p>
                  </div>

                  <p className="text-yellow-500 font-semibold">
                    ₹{(Number(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 pt-5 flex justify-between">
            <p className="text-lg font-semibold">Total</p>

            <p className="text-xl font-bold text-yellow-500">
              ₹{Number(order.total_amount).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
