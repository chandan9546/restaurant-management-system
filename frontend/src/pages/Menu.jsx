import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const BASEURL = import.meta.env.VITE_API_URL;

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

  const filteredItems = menuItems.filter((item) => {
    const searchText = search.toLowerCase();

    const matchSearch = item.name
      .toLowerCase()
      .includes(searchText);

    const matchCategory =
      category === "all" || item.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <section className="bg-[#0F0F0F] min-h-screen py-20 text-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="text-[#C89B3C] uppercase text-sm">
            Our Menu
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Explore Our Dishes
          </h1>

          <p className="text-gray-400 mt-3">
            Choose your favorite food from our menu
          </p>
        </div>

        {/* Search */}
        <div className="mt-10 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white text-black outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">

          <button
            onClick={() => setCategory("all")}
            className={`px-5 py-2 rounded-lg ${
              category === "all"
                ? "bg-[#C89B3C] text-black"
                : "bg-[#1A1A1A] text-white"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setCategory("starter")}
            className={`px-5 py-2 rounded-lg ${
              category === "starter"
                ? "bg-[#C89B3C] text-black"
                : "bg-[#1A1A1A] text-white"
            }`}
          >
            Starter
          </button>

          <button
            onClick={() => setCategory("main")}
            className={`px-5 py-2 rounded-lg ${
              category === "main"
                ? "bg-[#C89B3C] text-black"
                : "bg-[#1A1A1A] text-white"
            }`}
          >
            Main Course
          </button>

          <button
            onClick={() => setCategory("dessert")}
            className={`px-5 py-2 rounded-lg ${
              category === "dessert"
                ? "bg-[#C89B3C] text-black"
                : "bg-[#1A1A1A] text-white"
            }`}
          >
            Dessert
          </button>

          <button
            onClick={() => setCategory("drink")}
            className={`px-5 py-2 rounded-lg ${
              category === "drink"
                ? "bg-[#C89B3C] text-black"
                : "bg-[#1A1A1A] text-white"
            }`}
          >
            Drink
          </button>

        </div>

        {/* Food Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">

          {filteredItems.map((item) => (
            <Link to={`/menu/${item.id}`} key={item.id}>

              <div className="bg-[#1A1A1A] rounded-xl overflow-hidden hover:scale-[1.02] transition">

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-5">

                  <h3 className="text-xl font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {item.description}
                  </p>

                  <p className="text-[#C89B3C] font-semibold mt-4">
                    ₹{item.price}
                  </p>

                </div>
              </div>

            </Link>
          ))}

        </div>

        {/* No Result */}
        {filteredItems.length === 0 && (
          <p className="text-center text-gray-400 mt-12">
            No food found.
          </p>
        )}

      </div>
    </section>
  );
}

export default Menu;