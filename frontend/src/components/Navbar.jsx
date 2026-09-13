import { Link, useLocation } from "react-router-dom";

function Navbar({ cart, setCart }) {
  const location = useLocation();

  const token = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    setCart([]);

    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Royal Rasoi
        </h1>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">

          <Link
            to="/"
            className="hover:text-yellow-400"
          >
            Home
          </Link>

          <Link
            to="/menu"
            className="hover:text-yellow-400"
          >
            Menu
          </Link>

          <Link
            to="/about"
            className="hover:text-yellow-400"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="hover:text-yellow-400"
          >
            Contact
          </Link>

          <Link
            to="/reviews"
            className="hover:text-yellow-400"
          >
            Reviews
          </Link>

          <Link
            to="/reservation"
            className="hover:text-yellow-400"
          >
            Book Table
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative hover:text-yellow-400"
          >
            Cart

            {cart.length > 0 && (
              <span className="absolute -top-3 -right-4 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </span>
            )}
          </Link>

          {/* Logged In User */}
          {token ? (
            <>
              <Link
                to="/my-reservations"
                className="hover:text-yellow-400"
              >
                My Reservations
              </Link>

              <Link
                to="/my-orders"
                className="hover:text-yellow-400"
              >
                My Orders
              </Link>

              <Link
                to="/profile"
                className="hover:text-yellow-400"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Logged Out User */}
              <Link
                to="/login"
                className="hover:text-yellow-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-yellow-400"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;