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
      <section className="bg-[#0F0F0F] min-h-screen text-white flex items-center justify-center px-4">
        <p className="text-red-400 text-center">{error}</p>
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
    <section className="bg-[#0F0F0F] min-h-screen py-12 sm:py-16 md:py-20 text-white">
      <div className="max-w-md mx-auto px-4 sm:px-6">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-[#1A1A1A] p-5 sm:p-6 rounded-xl mt-8 sm:mt-10">

          {/* Username */}
          <div className="mb-5">
            <p className="text-gray-400 text-sm">
              Username
            </p>

            <p className="text-lg sm:text-xl font-semibold mt-1 wrap-break-words">
              {user.username}
            </p>
          </div>

          {/* Phone */}
          <div className="mb-5">
            <p className="text-gray-400 text-sm">
              Phone
            </p>

            <p className="text-lg sm:text-xl font-semibold mt-1 wrap-break-words">
              {user.phone}
            </p>
          </div>

          {/* Address */}
          <div>
            <p className="text-gray-400 text-sm">
              Address
            </p>

            <p className="text-lg sm:text-xl font-semibold mt-1 wrap-break-words">
              {user.address}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Profile;