import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const BASEURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${BASEURL}/api/profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.username);
        setPhone(data.phone);
        setAddress(data.address);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [BASEURL, navigate]);

  const totalPrice = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const finalTotal = totalPrice.toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      name: name,
      phone: phone,
      address: address,
      total_amount: finalTotal,

      items: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    fetch(`${BASEURL}/api/orders/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },

      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.order_id) {
          setCart([]);

          alert("Order placed successfully");

          navigate("/");
        } else {
          alert("Order failed");
        }
      })
      .catch((error) => {
        console.log(error);

        alert("Something went wrong");
      });
  };

  return (
    <section className="bg-[#0F0F0F] min-h-screen py-12 sm:py-16 md:py-20 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 sm:mt-10">

            {/* Customer Details */}
            <div className="bg-[#1A1A1A] p-4 sm:p-6 rounded-xl">

              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6">
                Customer Details
              </h2>

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 mb-4 bg-white text-black rounded"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full p-3 mb-4 bg-white text-black rounded"
              />

              <textarea
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows="4"
                className="w-full p-3 mb-4 bg-white text-black rounded resize-none"
              />

            </div>

            {/* Order Summary */}
            <div className="bg-[#1A1A1A] p-4 sm:p-6 rounded-xl">

              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6">
                Order Summary
              </h2>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start gap-4 border-b border-gray-700 py-3"
                >

                  <div className="min-w-0">
                    <p className="wrap-break-words">
                      {item.name}
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="text-[#C89B3C] whitespace-nowrap">
                    ₹{(
                      Number(item.price) * item.quantity
                    ).toFixed(2)}
                  </p>

                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between items-center gap-4 mt-6">

                <p className="text-lg sm:text-xl font-semibold">
                  Total
                </p>

                <p className="text-xl sm:text-2xl font-bold text-[#C89B3C] whitespace-nowrap">
                  ₹{finalTotal}
                </p>

              </div>

              {/* Place Order */}
              <button
                type="submit"
                className="w-full bg-[#C89B3C] text-black py-3 rounded-md mt-6 font-semibold cursor-pointer hover:bg-[#D9AF55] transition"
              >
                Place Order
              </button>

            </div>

          </div>

        </form>

      </div>
    </section>
  );
}

export default Checkout;