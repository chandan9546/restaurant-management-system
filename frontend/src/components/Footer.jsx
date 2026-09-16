import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">

          {/* Restaurant Info */}
          <div>
            <h2 className="text-2xl font-bold text-yellow-500">
              Royal Rasoi
            </h2>

            <p className="text-gray-400 mt-4 leading-6 text-sm sm:text-base">
              Experience the authentic taste of Indian cuisine
              with delicious food and a royal dining experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <Link
                to="/"
                className="hover:text-yellow-500 cursor-pointer"
              >
                Home
              </Link>

              <Link
                to="/menu"
                className="hover:text-yellow-500 cursor-pointer"
              >
                Menu
              </Link>

              <Link
                to="/about"
                className="hover:text-yellow-500 cursor-pointer"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="hover:text-yellow-500 cursor-pointer"
              >
                Contact
              </Link>

              <Link
                to="/reservation"
                className="hover:text-yellow-500 cursor-pointer"
              >
                Book a Table
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact Us
            </h3>

            <div className="space-y-3 text-gray-400 text-sm sm:text-base">

              <p>📍 Noida, Uttar Pradesh</p>
              <p>📞 +91 9546473288</p>
              <p>✉️ royalrasoi@example.com</p>

            </div>

            <div className="flex flex-wrap gap-4 sm:gap-5 mt-5">

              <a
                href="#"
                className="hover:text-yellow-500 cursor-pointer"
              >
                Instagram
              </a>

              <a
                href="#"
                className="hover:text-yellow-500 cursor-pointer"
              >
                Facebook
              </a>

              <a
                href="#"
                className="hover:text-yellow-500 cursor-pointer"
              >
                YouTube
              </a>

            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 sm:mt-10 pt-6 text-center">

          <p className="text-gray-500 text-xs sm:text-sm">
            © 2026 Royal Rasoi. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;