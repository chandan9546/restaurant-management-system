function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* About Hero */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">

          <p className="text-yellow-500 uppercase tracking-widest text-sm">
            About Royal Rasoi
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Taste of Tradition, Served with Love
          </h1>

          <p className="text-gray-400 max-w-3xl mx-auto mt-6 leading-7">
            Welcome to Royal Rasoi, where traditional Indian flavors
            meet a modern dining experience. We serve delicious food
            prepared with fresh ingredients, authentic spices and lots
            of care.
          </p>

        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold text-yellow-500 mb-5">
              Our Story
            </h2>

            <p className="text-gray-400 leading-7 mb-4">
              Royal Rasoi was created with a simple idea — to bring
              authentic Indian food and a warm dining experience
              together in one place.
            </p>

            <p className="text-gray-400 leading-7">
              From delicious starters to traditional main courses
              and sweet desserts, every dish is prepared with
              carefully selected ingredients and authentic Indian
              flavors.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">

            <h3 className="text-2xl font-semibold mb-5">
              Why Choose Us?
            </h3>

            <div className="space-y-5">

              <div>
                <h4 className="text-lg font-semibold text-yellow-500">
                  Fresh Ingredients
                </h4>
                <p className="text-gray-400 mt-1">
                  We use fresh and quality ingredients in our dishes.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-yellow-500">
                  Authentic Flavors
                </h4>
                <p className="text-gray-400 mt-1">
                  Enjoy the traditional taste of Indian spices and recipes.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-yellow-500">
                  Great Experience
                </h4>
                <p className="text-gray-400 mt-1">
                  We focus on good food, friendly service and a
                  comfortable dining experience.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Our Values */}
      <section className="px-6 py-16 bg-gray-900">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

            <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🍛</div>

              <h3 className="text-xl font-semibold text-yellow-500">
                Quality Food
              </h3>

              <p className="text-gray-400 mt-3">
                Quality ingredients and carefully prepared dishes
                are at the heart of our restaurant.
              </p>
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">❤️</div>

              <h3 className="text-xl font-semibold text-yellow-500">
                Made with Love
              </h3>

              <p className="text-gray-400 mt-3">
                Every dish is prepared with care to give you a
                memorable food experience.
              </p>
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">👑</div>

              <h3 className="text-xl font-semibold text-yellow-500">
                Royal Experience
              </h3>

              <p className="text-gray-400 mt-3">
                We aim to make every visit comfortable, enjoyable
                and special.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 text-center">

        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Taste the Royal Flavors?
        </h2>

        <p className="text-gray-400 mt-4">
          Explore our menu and enjoy authentic Indian cuisine.
        </p>

        <a
          href="/menu"
          className="inline-block mt-7 bg-yellow-600 hover:bg-yellow-500 text-black px-7 py-3 rounded-lg font-semibold"
        >
          Explore Menu
        </a>

      </section>

    </div>
  );
}

export default About;