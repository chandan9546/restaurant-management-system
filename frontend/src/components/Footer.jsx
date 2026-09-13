import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Restaurant Info */}
          <div>
            <h2 className="text-2xl font-bold text-yellow-500">
              Royal Rasoi
            </h2>

            <p className="text-gray-400 mt-4 leading-6">
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
                className="hover:text-yellow-500"
              >
                Home
              </Link>

              <Link
                to="/menu"
                className="hover:text-yellow-500"
              >
                Menu
              </Link>

              <Link
                to="/about"
                className="hover:text-yellow-500"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="hover:text-yellow-500"
              >
                Contact
              </Link>

              <Link
                to="/reservation"
                className="hover:text-yellow-500"
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

            <div className="space-y-3 text-gray-400">
              <p>📍 Noida, Uttar Pradesh</p>
              <p>📞 +91 9546473288</p>
              <p>✉️ royalrasoi@example.com</p>
            </div>

            <div className="flex gap-5 mt-5">
              <a
                href="#"
                className="hover:text-yellow-500"
              >
                Instagram
              </a>

              <a
                href="#"
                className="hover:text-yellow-500"
              >
                Facebook
              </a>

              <a
                href="#"
                className="hover:text-yellow-500"
              >
                YouTube
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Royal Rasoi. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;