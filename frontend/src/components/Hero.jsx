import heroFood from "../assets/hero-food.jpg";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className="min-h-[90vh] bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 min-h-[90vh] flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left Side - Text */}
          <div>
            <p className="text-[#C89B3C] uppercase text-sm mb-4">
              Welcome to Royal Rasoi
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Authentic Indian Cuisine
            </h1>

            <p className="text-gray-400 text-lg mt-6">
              Enjoy traditional Indian food made with fresh ingredients and
              served with love.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="bg-[#C89B3C] text-black px-6 py-3 rounded-md font-semibold">
                Explore Menu
              </button>

              <Link
                to="/reservation"
                className="border border-[#C89B3C] text-[#C89B3C] px-6 py-3 rounded-md"
              >
                Book a Table
              </Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div>
            <img
              src={heroFood}
              alt="Indian food"
              className="w-full h-95 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
