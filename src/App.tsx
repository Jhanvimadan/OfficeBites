import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import { SearchProvider } from "./context/SearchContext";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Layout() {
  // OFFICE STATE
  const [office, setOffice] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // redirect to login if no office selected (except on login page)

const isLoggedIn = !!localStorage.getItem("currentUserEmail");

  // ✅ Navbar: hide when logged out OR on login page
  const hideNavbar = !isLoggedIn || location.pathname === "/";

  // ✅ Footer: hide on login + menu pages
  const hideFooter =
    location.pathname === "/" ||
    location.pathname.startsWith("/menu");

  // ✅ Enforce logout by routing
  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);


  return (
    <>
      {/* Navbar */}
      {!hideNavbar && (
        <Navbar
          office={office}
          onChangeLocation={() => {
            /* handled in Home */
          }}
        />
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/home"
          element={<Home office={office} setOffice={setOffice} />}
        />
        <Route path="/menu/:id" element={<Menu />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* Footer */}
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
    <SearchProvider>
      <CartProvider>
        <Layout />
      </CartProvider>
      </SearchProvider>
    </BrowserRouter>
  );
}