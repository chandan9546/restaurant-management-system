import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const BASEURL = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
      phone: phone,
      address: address,
    };

    fetch(`${BASEURL}/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.message) {
          alert("Registration successful");

          setUsername("");
          setPassword("");
          setPhone("");
          setAddress("");
        } else {
          alert("Registration failed");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong");
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

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-3 mb-4 bg-white text-black rounded"
          />

          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows="3"
            className="w-full p-3 mb-4 bg-white text-black rounded"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#C89B3C] text-black py-3 rounded-md font-semibold cursor-pointer hover:bg-[#D9AF55] transition"
          >
            Register
          </button>

        </form>
      </div>
    </section>
  );
}

export default Register;