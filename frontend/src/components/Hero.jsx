import heroFood from "../assets/hero-food.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-[90vh] bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 min-h-[90vh] flex items-center">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center w-full">

          {/* Left Side - Text */}
          <div className="text-center md:text-left">

            <p className="text-[#C89B3C] uppercase text-xs sm:text-sm mb-4">
              Welcome to Royal Rasoi
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              Authentic Indian Cuisine
            </h1>

            <p className="text-gray-400 text-base sm:text-lg mt-5 sm:mt-6 max-w-xl mx-auto md:mx-0">
              Enjoy traditional Indian food made with fresh ingredients and
              served with love.
            </p>

            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

              <Link
                to="/menu"
                className="bg-[#C89B3C] text-black px-6 py-3 rounded-md font-semibold text-center cursor-pointer hover:bg-[#D9AF55] transition"
              >
                Explore Menu
              </Link>

              <Link
                to="/reservation"
                className="border border-[#C89B3C] text-[#C89B3C] px-6 py-3 rounded-md text-center cursor-pointer hover:bg-[#C89B3C] hover:text-black transition"
              >
                Book a Table
              </Link>

            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full">
            <img
              src={heroFood}
              alt="Indian food"
              className="w-full h-64 sm:h-80 md:h-95 object-cover rounded-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;