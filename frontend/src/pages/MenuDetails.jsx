import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MenuDetails({ addToCart }) {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);

  const BASEURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${BASEURL}/api/menu/${itemId}/`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [itemId]);

  if (!item) {
    return (
      <div className="bg-[#0F0F0F] min-h-screen text-white flex items-center justify-center px-4">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(item);
    alert("Item added to cart");
  };

  return (
    <section className="bg-[#0F0F0F] min-h-screen text-white py-12 sm:py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Back Button */}
        <Link
          to="/menu"
          className="text-[#C89B3C] hover:text-[#D9AF55] cursor-pointer"
        >
          ← Back to Menu
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center mt-8">

          {/* Food Image */}
          <div className="w-full">

            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-64 sm:h-80 md:h-96 bg-[#1A1A1A] rounded-xl flex items-center justify-center">
                <p className="text-gray-500">
                  No image available
                </p>
              </div>
            )}

          </div>

          {/* Food Details */}
          <div>

            <p className="text-[#C89B3C] uppercase text-xs sm:text-sm">
              {item.category}
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold mt-3">
              {item.name}
            </h1>

            <p className="text-gray-400 mt-5 leading-7 text-sm sm:text-base">
              {item.description}
            </p>

            <p className="text-[#C89B3C] text-2xl font-bold mt-6">
              ₹{item.price}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">

              <button
                onClick={handleAddToCart}
                className="bg-[#C89B3C] hover:bg-[#D9AF55] text-black px-6 py-3 rounded-md font-semibold cursor-pointer transition"
              >
                Add to Cart
              </button>

              <Link
                to="/cart"
                className="border border-[#C89B3C] text-[#C89B3C] px-6 py-3 rounded-md text-center hover:bg-[#C89B3C] hover:text-black cursor-pointer transition"
              >
                View Cart
              </Link>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default MenuDetails;