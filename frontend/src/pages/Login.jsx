import { useState } from "react";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {

        console.log(result);

        if (result.access) {

          localStorage.setItem("access", result.access);
          localStorage.setItem("refresh", result.refresh);

          alert("Login successful");

        } else {

          alert("Invalid username or password");

        }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="bg-[#0F0F0F] min-h-screen py-20 text-white">

      <div className="max-w-md mx-auto px-6">

        <h1 className="text-4xl font-bold text-center">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1A1A1A] p-6 rounded-xl mt-8"
        >

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 mb-4 bg-white text-black rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 bg-white text-black rounded"
          />

          <button
            type="submit"
            className="w-full bg-[#C89B3C] text-black py-3 rounded font-semibold"
          >
            Login
          </button>

        </form>

      </div>

    </section>
  );
}

export default Login;