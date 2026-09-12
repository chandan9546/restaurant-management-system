function Contact() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Page Heading */}
      <section className="px-6 py-14 text-center">
        <p className="text-yellow-500 uppercase tracking-widest text-sm">
          Contact Us
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-3">
          Visit Royal Rasoi
        </h1>

        <p className="text-gray-400 mt-4">
          We would love to serve you.
        </p>
      </section>

      {/* Contact Details */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Address */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-7">
            <h2 className="text-xl font-semibold text-yellow-500">
              📍 Restaurant Address
            </h2>

            <p className="text-gray-400 mt-3 leading-7">
              Royal Rasoi<br />
              Sector 62, Noida<br />
              Uttar Pradesh, India
            </p>
          </div>

          {/* Phone */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-7">
            <h2 className="text-xl font-semibold text-yellow-500">
              📞 Phone
            </h2>

            <p className="text-gray-400 mt-3">
              +91 98765 43210
            </p>
          </div>

          {/* Email */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-7">
            <h2 className="text-xl font-semibold text-yellow-500">
              ✉️ Email
            </h2>

            <p className="text-gray-400 mt-3">
              royalrasoi@example.com
            </p>
          </div>

          {/* Opening Hours */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-7">
            <h2 className="text-xl font-semibold text-yellow-500">
              🕐 Opening Hours
            </h2>

            <div className="text-gray-400 mt-3 space-y-2">
              <p>Monday - Friday: 11:00 AM - 10:30 PM</p>
              <p>Saturday - Sunday: 11:00 AM - 11:00 PM</p>
            </div>
          </div>

        </div>
      </section>

      {/* Social Media */}
      <section className="bg-gray-900 px-6 py-12 text-center">

        <h2 className="text-2xl font-bold">
          Follow Royal Rasoi
        </h2>

        <div className="flex justify-center gap-8 mt-6">

          <a
            href="#"
            className="text-gray-400 hover:text-yellow-500"
          >
            Instagram
          </a>

          <a
            href="#"
            className="text-gray-400 hover:text-yellow-500"
          >
            Facebook
          </a>

          <a
            href="#"
            className="text-gray-400 hover:text-yellow-500"
          >
            YouTube
          </a>

        </div>

      </section>

    </div>
  );
}

export default Contact;