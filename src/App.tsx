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
import { Toaster } from "react-hot-toast";
import Orders from "./pages/Orders";
import { SearchProvider } from "./context/SearchContext";

<Toaster />

//import Footer from "./components/Footer";

function Layout() {
  // OFFICE STATE
  const [office, setOffice] = useState<string | null>(null);

  const location = useLocation();
  const hideGlobalUI = location.pathname === "/";

  return (
    <>
      {!hideGlobalUI && (
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
        {/* PASS setOffice */}
        <Route
          path="/home"
          element={<Home office={office} setOffice={setOffice} />}
        />

        <Route
          path="/menu/:id"
          element={<Menu />}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

      {/*{!hideGlobalUI && <Footer />}*/}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
    <SearchProvider>
      <CartProvider>
        <Toaster position="top-right" />
        <Layout />
      </CartProvider>
      </SearchProvider>
    </BrowserRouter>
  );
}