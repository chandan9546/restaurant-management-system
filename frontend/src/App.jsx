import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import MenuDetails from "./pages/MenuDetails";
import Reservation from "./pages/Reservation";
import ReservationSuccess from "./pages/ReservationSuccess";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import MyReservations from "./pages/MyReservations";
import Reviews from "./pages/Reviews";
import OrderDetails from "./pages/OrderDetails";

function App() {
  const [cart, setCart] = useState(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      return [];
    }

    const savedCart = localStorage.getItem(`cart_${username}`);

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  };

  return (
    <BrowserRouter>
      <Navbar cart={cart} setCart={setCart} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/menu" element={<Menu />} />

        <Route
          path="/menu/:itemId"
          element={<MenuDetails addToCart={addToCart} />}
        />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

        <Route
          path="/checkout"
          element={<Checkout cart={cart} setCart={setCart} />}
        />

        <Route path="/reservation" element={<Reservation />} />

        <Route path="/reservation-success" element={<ReservationSuccess />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-reservations"
          element={
            <ProtectedRoute>
              <MyReservations />
            </ProtectedRoute>
          }
        />

        <Route path="/reviews" element={<Reviews />} />

        <Route
          path="/my-orders/:orderId"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
