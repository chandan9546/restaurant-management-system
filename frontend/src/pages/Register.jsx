import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

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

    fetch(`${BASEURL}/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const result = await response.json();

        if (!response.ok) {
          const errorMessage = Object.entries(result)
            .map(([field, errors]) => {
              if (Array.isArray(errors)) {
                return `${field}: ${errors.join(", ")}`;
              }

              return `${field}: ${errors}`;
            })
            .join("\n");

          throw new Error(
            errorMessage || "Registration failed"
          );
        }

        return result;
      })
      .then((result) => {
        console.log(result);

        alert("Registration successful! Please login.");

        setUsername("");
        setPassword("");

        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
        setLoading(false);
      });
  };

  return (
    <section className="bg-[#0F0F0F] min-h-screen py-12 sm:py-16 md:py-20 text-white">
      <div className="max-w-md mx-auto px-4 sm:px-6">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mt-3 text-sm sm:text-base">
          Register to order your favourite food.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1A1A1A] p-5 sm:p-6 rounded-xl mt-8 sm:mt-10"
        >

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 mb-4 bg-white text-black rounded outline-none"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-white text-black rounded outline-none"
          />

          {/* Password Requirement Message */}
          <div className="mt-3 mb-5 text-gray-400 text-xs sm:text-sm leading-6">
            <p className="text-gray-300 font-medium mb-1">
              Password must contain:
            </p>

            <p>• At least 8 characters</p>
            <p>• One uppercase letter (A-Z)</p>
            <p>• One lowercase letter (a-z)</p>
            <p>• One number (0-9)</p>
            <p>• One special character (@ # $ % & *)</p>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C89B3C] text-black py-3 rounded-md font-semibold cursor-pointer hover:bg-[#D9AF55] disabled:bg-gray-600 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>
      </div>
    </section>
  );
}

export default Register;