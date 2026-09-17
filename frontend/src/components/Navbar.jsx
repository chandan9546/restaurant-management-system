import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ cart, setCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Login ke baad route change hone par Navbar re-render hoga
  useLocation();

  const token = localStorage.getItem("access");
  const isStaff = localStorage.getItem("is_staff") === "true";

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    localStorage.removeItem("is_staff");

    setCart([]);

    window.location.href = "/login";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto">

        {/* Top Navbar */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-bold cursor-pointer"
          >
            Royal Rasoi
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">

            {token && isStaff ? (
              <>
                <Link
                  to="/admin-dashboard"
                  className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                >
                  Admin Dashboard
                </Link>

                <Link
                  to="/admin-menu"
                  className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                >
                  Manage Menu
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Home
                </Link>

                <Link
                  to="/menu"
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Menu
                </Link>

                <Link
                  to="/about"
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Contact
                </Link>

                <Link
                  to="/reviews"
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Reviews
                </Link>

                <Link
                  to="/reservation"
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Book Table
                </Link>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative hover:text-yellow-400 cursor-pointer"
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

                {token ? (
                  <>
                    <Link
                      to="/my-reservations"
                      className="hover:text-yellow-400 cursor-pointer"
                    >
                      My Reservations
                    </Link>

                    <Link
                      to="/my-orders"
                      className="hover:text-yellow-400 cursor-pointer"
                    >
                      My Orders
                    </Link>

                    <Link
                      to="/profile"
                      className="hover:text-yellow-400 cursor-pointer"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="hover:text-yellow-400 cursor-pointer"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="hover:text-yellow-400 cursor-pointer"
                    >
                      Register
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-3xl cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 border-t border-gray-700 pt-4">

            {token && isStaff ? (
              <div className="flex flex-col gap-4">

                <Link
                  to="/admin-dashboard"
                  onClick={closeMenu}
                  className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                >
                  Admin Dashboard
                </Link>

                <Link
                  to="/admin-menu"
                  onClick={closeMenu}
                  className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                >
                  Manage Menu
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 text-left cursor-pointer"
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex flex-col gap-4">

                <Link
                  to="/"
                  onClick={closeMenu}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Home
                </Link>

                <Link
                  to="/menu"
                  onClick={closeMenu}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Menu
                </Link>

                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Contact
                </Link>

                <Link
                  to="/reviews"
                  onClick={closeMenu}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Reviews
                </Link>

                <Link
                  to="/reservation"
                  onClick={closeMenu}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Book Table
                </Link>

                {/* Mobile Cart */}
                <Link
                  to="/cart"
                  onClick={closeMenu}
                  className="relative w-fit hover:text-yellow-400 cursor-pointer"
                >
                  Cart

                  {cart.length > 0 && (
                    <span className="absolute -top-3 -right-5 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cart.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  )}
                </Link>

                {token ? (
                  <>
                    <Link
                      to="/my-reservations"
                      onClick={closeMenu}
                      className="hover:text-yellow-400 cursor-pointer"
                    >
                      My Reservations
                    </Link>

                    <Link
                      to="/my-orders"
                      onClick={closeMenu}
                      className="hover:text-yellow-400 cursor-pointer"
                    >
                      My Orders
                    </Link>

                    <Link
                      to="/profile"
                      onClick={closeMenu}
                      className="hover:text-yellow-400 cursor-pointer"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300 text-left cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="hover:text-yellow-400 cursor-pointer"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className="hover:text-yellow-400 cursor-pointer"
                    >
                      Register
                    </Link>
                  </>
                )}

              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;