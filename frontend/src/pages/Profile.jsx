import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const BASEURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      setError("Please login first.");
      return;
    }

    fetch(`${BASEURL}/api/profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load profile");
        }

        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        setError("Unable to load profile.");
      });
  }, [BASEURL]);

  if (error) {
    return (
      <section className="bg-[#0F0F0F] min-h-screen text-white flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="bg-[#0F0F0F] min-h-screen text-white flex items-center justify-center">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="bg-[#0F0F0F] min-h-screen py-20 text-white">
      <div className="max-w-md mx-auto px-6">

        <h1 className="text-4xl font-bold text-center">
          My Profile
        </h1>

        <div className="bg-[#1A1A1A] p-6 rounded-xl mt-10">

          <div className="mb-5">
            <p className="text-gray-400">Username</p>
            <p className="text-xl font-semibold mt-1">
              {user.username}
            </p>
          </div>

          <div className="mb-5">
            <p className="text-gray-400">Phone</p>
            <p className="text-xl font-semibold mt-1">
              {user.phone}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Address</p>
            <p className="text-xl font-semibold mt-1">
              {user.address}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Profile;