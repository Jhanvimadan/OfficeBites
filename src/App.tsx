import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Navbar from "./components/Navbar";
import { useState } from "react";

function Layout(){
   const [office, setOffice] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false); //visibility control of LocationModal
    
    const location = useLocation();
    const hideNavbar= location.pathname ==="/";

    return (
      <>
      {!hideNavbar && (<Navbar
              office={office}
              onChangeLocation={() => setShowModal(true)} 
            />
            )}
          
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu/:id" element={<Menu />} />
      </Routes>
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