import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const finalTotal = totalPrice.toFixed(2);

  return (
    <section className="bg-[#0F0F0F] min-h-screen py-12 sm:py-16 md:py-20 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            Your cart is empty.
          </p>
        ) : (
          <div className="mt-8 sm:mt-10">

            {/* Cart Items */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#1A1A1A] p-4 sm:p-5 rounded-xl mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                {/* Item Details */}
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold wrap-break-word">
                    {item.name}
                  </h2>

                  <p className="text-gray-400 mt-1">
                    ₹{item.price}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3">

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-700 px-3 py-1 rounded cursor-pointer hover:bg-gray-600 transition"
                  >
                    -
                  </button>

                  <span className="text-lg min-w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-700 px-3 py-1 rounded cursor-pointer hover:bg-gray-600 transition"
                  >
                    +
                  </button>

                </div>

                {/* Item Total */}
                <p className="text-[#C89B3C] font-semibold">
                  ₹{(Number(item.price) * item.quantity).toFixed(2)}
                </p>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 cursor-pointer hover:text-red-300 text-left md:text-center transition"
                >
                  Remove
                </button>

              </div>
            ))}

            {/* Total Section */}
            <div className="bg-[#1A1A1A] p-5 sm:p-6 rounded-xl mt-8 text-center sm:text-right">

              <p className="text-gray-400">
                Total Amount
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#C89B3C] mt-2">
                ₹{finalTotal}
              </h2>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full sm:w-auto bg-[#C89B3C] text-black px-6 py-3 rounded-md mt-5 font-semibold cursor-pointer hover:bg-[#D9AF55] transition"
              >
                Checkout
              </button>

            </div>

          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;