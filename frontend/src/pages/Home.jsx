import Hero from "../components/Hero";
import FoodCard from "../components/FoodCard";

import biryani from "../assets/biryani.jpg";
import paneer from "../assets/paneer.jpg";
import butterChicken from "../assets/butter-chicken.jpg";

const Home=()=> {
  return (
    <main>
      <Hero />

      <section className="bg-[#0F0F0F] py-20">
        <div className="max-w-6xl mx-auto px-6">

          {/* Section Heading */}
          <div className="text-center">
            <p className="text-[#C89B3C] uppercase text-sm">
              Our Special
            </p>

            <h2 className="text-4xl font-bold text-white mt-2">
              Popular Dishes
            </h2>

            <p className="text-gray-400 mt-4">
              Taste some of our most loved Indian dishes.
            </p>
          </div>

          {/* Food Cards */}
          <div className="mt-10 grid md:grid-cols-3 gap-6">

            <FoodCard
              name="Chicken Biryani"
              description="Delicious Indian biryani with fresh spices."
              price="₹250"
              image={biryani}
            />

            <FoodCard
              name="Paneer Tikka"
              description="Soft paneer cooked with Indian spices."
              price="₹220"
              image={paneer}
            />

            <FoodCard
              name="Butter Chicken"
              description="Creamy chicken curry with rich spices."
              price="₹280"
              image={butterChicken}
            />

          </div>

          {/* View Menu Button */}
          <div className="text-center mt-10">
            <button className="border border-[#C89B3C] text-[#C89B3C] px-6 py-3 rounded-md">
              View Full Menu
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Home;