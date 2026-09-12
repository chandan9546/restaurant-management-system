import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MenuDetails({ addToCart }) {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const BASEURL=import.meta.env.VITE_API_URL;

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
      <div className="bg-[#0F0F0F] min-h-screen text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-[#0F0F0F] min-h-screen text-white py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-96 object-cover rounded-xl"
            />
          )}

          <div>
            <p className="text-[#C89B3C] uppercase text-sm">{item.category}</p>

            <h1 className="text-4xl font-bold mt-3">{item.name}</h1>

            <p className="text-gray-400 mt-5">{item.description}</p>

            <p className="text-[#C89B3C] text-2xl font-bold mt-6">
              ₹{item.price}
            </p>

            <button
              onClick={() => addToCart(item)}
              className="bg-[#C89B3C] text-black px-6 py-3 rounded-md mt-6 font-semibold cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuDetails;
