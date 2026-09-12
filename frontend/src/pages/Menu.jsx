import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const BASEURL=import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${BASEURL}/api/menu/`)
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <section className="bg-[#0F0F0F] min-h-screen py-20 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <p className="text-[#C89B3C] uppercase text-sm">Our Menu</p>

          <h1 className="text-4xl font-bold mt-2">Explore Our Dishes</h1>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link to={`/menu/${item.id}`} key={item.id}>
              <div className="bg-[#1A1A1A] rounded-xl overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-5">
                  <h3 className="text-xl font-semibold">{item.name}</h3>

                  <p className="text-gray-400 mt-2">{item.description}</p>

                  <p className="text-[#C89B3C] font-semibold mt-4">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;
