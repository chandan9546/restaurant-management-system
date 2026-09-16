const FoodCard = (props) => {
  return (
    <div className="bg-[#1A1A1A] rounded-xl overflow-hidden hover:scale-[1.02] sm:hover:scale-105 transition">

      {/* Food Image */}
      <img
        src={props.image}
        alt={props.name}
        className="w-full h-52 sm:h-56 object-cover"
      />

      {/* Food Details */}
      <div className="p-4 sm:p-5">

        <h3 className="text-lg sm:text-xl font-semibold text-white">
          {props.name}
        </h3>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          {props.description}
        </p>

        <div className="flex items-center justify-between gap-3 mt-5">

          <p className="text-[#C89B3C] font-semibold">
            {props.price}
          </p>

          <button
            className="bg-[#C89B3C] text-black px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base cursor-pointer hover:bg-[#D9AF55] transition"
          >
            Order Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default FoodCard;