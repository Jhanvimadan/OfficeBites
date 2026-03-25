import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LocationModal from "../components/LocationModal";
import CafeteriaList from "../components/CafeteriaList";

export default function Home() {

  //stores selected office location, null means no loc selected by user
  const [office, setOffice] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); //visibility control of LocationModal

  //to check if user has previously saved location in browser storage
  useEffect(() => {
    const savedOffice = localStorage.getItem("office");
    setOffice(savedOffice);
//if no saved location, auto opens modal
    if (!savedOffice) {
      setShowModal(true);
    }
  }, []);

  return (
    <>
    {/*send data to navbar*/}
      <Navbar
        office={office}
        onChangeLocation={() => setShowModal(true)} 
      />

      <Hero
        office={office}
        onChangeLocation={() => setShowModal(true)}
      />
       <CafeteriaList />
      <LocationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)} //close modal
        onSelect={(value) => setOffice(value)} //update selected office
      />
    </>
  );
}