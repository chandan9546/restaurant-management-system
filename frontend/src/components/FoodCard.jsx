
const FoodCard = (props) => {
  return (
    <div className="bg-[#1A1A1A] rounded-xl overflow-hidden hover:scale-105 transition">

      <img
        src={props.image}
        alt={props.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <h3 className="text-xl font-semibold text-white">
          {props.name}
        </h3>

        <p className="text-gray-400 mt-2">
          {props.description}
        </p>

        <div className="flex items-center justify-between mt-5">

          <p className="text-[#C89B3C] font-semibold">
            {props.price}
          </p>

          <button className="bg-[#C89B3C] text-black px-4 py-2 rounded-md">
            Order Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default FoodCard;

