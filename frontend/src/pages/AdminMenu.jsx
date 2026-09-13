import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminMenu() {
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("starter");
  const [image, setImage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const BASEURL = import.meta.env.VITE_API_URL;

  // Get all menu items
  const getMenu = () => {
    const token = localStorage.getItem("access");

    fetch(`${BASEURL}/api/admin/menu/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load menu"
          );
        }

        return data;
      })
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
        setLoading(false);
      });
  };

  // Check admin and load menu
  useEffect(() => {
    const token = localStorage.getItem("access");
    const isStaff =
      localStorage.getItem("is_staff") === "true";

    if (!token || !isStaff) {
      navigate("/");
      return;
    }

    getMenu();
  }, []);

  // Clear form
  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("starter");
    setImage("");
    setEditingId(null);
  };

  // Add / Update menu
  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");

    const data = {
      name: name,
      description: description,
      price: price,
      category: category,
      image: image,
    };

    let url = `${BASEURL}/api/admin/menu/`;
    let method = "POST";

    if (editingId) {
      url = `${BASEURL}/api/admin/menu/${editingId}/`;
      method = "PUT";
    }

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const result = await response.json();

        if (!response.ok) {
          console.log(
            "Backend validation error:",
            result
          );

          const errorMessage = Object.entries(result)
            .map(([field, errors]) => {
              if (Array.isArray(errors)) {
                return `${field}: ${errors.join(", ")}`;
              }

              return `${field}: ${errors}`;
            })
            .join("\n");

          throw new Error(
            errorMessage ||
              result.message ||
              "Something went wrong"
          );
        }

        return result;
      })
      .then((result) => {
        alert(result.message);

        resetForm();
        getMenu();
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  // Edit menu
  const handleEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setCategory(item.category);
    setImage(item.image || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete menu
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("access");

    fetch(`${BASEURL}/api/admin/menu/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Unable to delete menu"
          );
        }

        return result;
      })
      .then((result) => {
        alert(result.message);
        getMenu();
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p>Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Page Heading */}

        <div className="mb-8">

          <p className="text-yellow-500 uppercase text-sm">
            Admin Panel
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Menu Management
          </h1>

          <p className="text-gray-400 mt-2">
            Add, edit and delete restaurant menu items.
          </p>

        </div>


        {/* Add / Edit Form */}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10"
        >

          <h2 className="text-2xl font-semibold mb-6">
            {editingId
              ? "Edit Menu Item"
              : "Add New Menu Item"}
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Name */}

            <div>

              <label className="block text-gray-300 mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Paneer Tikka"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
              />

            </div>


            {/* Price */}

            <div>

              <label className="block text-gray-300 mb-2">
                Price
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                placeholder="250"
                min="0"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
              />

            </div>


            {/* Category */}

            <div>

              <label className="block text-gray-300 mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
              >

                <option value="starter">
                  Starter
                </option>

                <option value="main">
                  Main Course
                </option>

                <option value="dessert">
                  Dessert
                </option>

                <option value="drink">
                  Drink
                </option>

              </select>

            </div>


            {/* Image */}

            <div>

              <label className="block text-gray-300 mb-2">
                Image URL
              </label>

              <input
                type="url"
                value={image}
                onChange={(e) =>
                  setImage(e.target.value)
                }
                placeholder="https://example.com/image.jpg"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
              />

            </div>


            {/* Description */}

            <div className="md:col-span-2">

              <label className="block text-gray-300 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Enter menu description"
                required
                rows="4"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
              />

            </div>

          </div>


          {/* Buttons */}

          <div className="flex gap-4 mt-6">

            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg"
            >
              {editingId
                ? "Update Menu"
                : "Add Menu"}
            </button>


            {editingId && (

              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg"
              >
                Cancel
              </button>

            )}

          </div>

        </form>


        {/* Existing Menu */}

        <h2 className="text-2xl font-semibold mb-5">
          Existing Menu
        </h2>


        {menu.length === 0 ? (

          <p className="text-gray-400">
            No menu items found.
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {menu.map((item) => (

              <div
                key={item.id}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
              >

                {/* Image */}

                {item.image && (

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />

                )}


                <div className="p-5">

                  <p className="text-yellow-500 text-sm uppercase">
                    {item.category}
                  </p>


                  <h3 className="text-xl font-semibold mt-2">
                    {item.name}
                  </h3>


                  <p className="text-gray-400 mt-2">
                    {item.description}
                  </p>


                  <p className="text-yellow-500 font-bold text-lg mt-4">
                    ₹{item.price}
                  </p>


                  {/* Edit / Delete */}

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() =>
                        handleEdit(item)
                      }
                      className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg"
                    >
                      Edit
                    </button>


                    <button
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      className="flex-1 bg-red-600 hover:bg-red-500 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminMenu;