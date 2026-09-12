import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Reviews() {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const BASEURL = import.meta.env.VITE_API_URL;

  const fetchReviews = () => {
    fetch(`${BASEURL}/api/reviews/`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
      return;
    }

    const data = {
      rating: Number(rating),
      comment: comment,
    };

    fetch(`${BASEURL}/api/reviews/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {

        if (result.data) {
          alert("Review submitted successfully");

          setRating(5);
          setComment("");

          fetchReviews();
        } else {
          alert("Failed to submit review");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong");
      });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-8">
          Customer Reviews
        </h1>

        {/* Review Form */}

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10">

          <h2 className="text-xl font-semibold mb-5">
            Write a Review
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Rating */}

            <div>

              <label className="block mb-2 text-gray-300">
                Rating
              </label>

              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
              >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>

            </div>

            {/* Comment */}

            <div>

              <label className="block mb-2 text-gray-300">
                Comment
              </label>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                required
                rows="4"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-yellow-500"
              />

            </div>

            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg"
            >
              Submit Review
            </button>

          </form>

        </div>

        {/* Reviews */}

        <div>

          <h2 className="text-2xl font-semibold mb-5">
            What Our Customers Say
          </h2>

          {loading ? (
            <p className="text-gray-400">
              Loading reviews...
            </p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-400">
              No reviews yet.
            </p>
          ) : (
            <div className="space-y-4">

              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-5"
                >

                  <div className="flex justify-between items-center mb-3">

                    <h3 className="font-semibold">
                      {review.username}
                    </h3>

                    <span className="text-yellow-500">
                      {"★".repeat(review.rating)}
                    </span>

                  </div>

                  <p className="text-gray-300">
                    {review.comment}
                  </p>

                  <p className="text-gray-500 text-sm mt-3">
                    {new Date(
                      review.created_at
                    ).toLocaleString()}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Reviews;