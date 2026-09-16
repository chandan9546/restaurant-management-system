import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const BASEURL = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    const data = {
      username: username,
      password: password,
    };

    fetch(`${BASEURL}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Invalid username or password"
          );
        }

        return result;
      })
      .then((result) => {
        // Save JWT tokens
        localStorage.setItem("access", result.access);
        localStorage.setItem("refresh", result.refresh);

        // Save username
        localStorage.setItem("username", username);

        // Check if user is staff
        localStorage.setItem("is_staff", result.is_staff);

        // Check where user came from
        const from = location.state?.from || "/";

        // Go to previous requested page
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 sm:px-6 py-10">

      <div className="w-full max-w-md">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-800 rounded-xl p-5 sm:p-8"
        >

          {/* Username */}
          <div className="mb-5">

            <label className="block text-sm text-gray-300 mb-2">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full px-4 py-3 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-yellow-500"
            />

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-yellow-500"
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-black py-3 rounded-lg font-semibold cursor-pointer transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;