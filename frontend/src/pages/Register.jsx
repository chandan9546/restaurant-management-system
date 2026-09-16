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
    <section className="bg-[#0F0F0F] min-h-screen py-20 text-white">
      <div className="max-w-md mx-auto px-6">

        <h1 className="text-4xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mt-3">
          Register to order your favourite food.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1A1A1A] p-6 rounded-xl mt-10"
        >

          {/* Username */}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 mb-4 bg-white text-black rounded"
          />

          {/* Password */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 bg-white text-black rounded"
          />

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