import React from "react";
import { useNavigate } from "react-router-dom";
function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
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
    <section className="bg-[#0F0F0F] min-h-screen py-20 text-white">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">Your cart is empty.</p>
        ) : (
          <div className="mt-10">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#1A1A1A] p-5 rounded-xl mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>

                  <p className="text-gray-400 mt-1">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-700 px-3 py-1 rounded cursor-pointer"
                  >
                    -
                  </button>

                  <span className="text-lg">{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-700 px-3 py-1 rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <p className="text-[#C89B3C] font-semibold">
                  ₹{(Number(item.price) * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 cursor-pointer hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="bg-[#1A1A1A] p-6 rounded-xl mt-8 text-right">
              <p className="text-gray-400">Total Amount</p>

              
                <h2 className="text-3xl font-bold text-[#C89B3C] mt-2">
                  ₹{finalTotal}
                </h2>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-[#C89B3C] text-black px-6 py-3 rounded-md mt-5 font-semibold cursor-pointer hover:bg-[#D9AF55] transition"
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
