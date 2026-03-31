import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Navbar from "./components/Navbar";
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

        {/* ✅ PASS setOffice */}
        <Route
          path="/home"
          element={<Home office={office} setOffice={setOffice} />}
        />

        <Route
          path="/menu/:id"
          element={<Menu />}
        />
      </Routes>

      {/*{!hideGlobalUI && <Footer />}*/}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}