import { useState, useEffect, useRef } from "react";
import Hero from "../components/Hero";
import LocationModal from "../components/LocationModal";
import CafeteriaList from "../components/CafeteriaList";
import SearchBar from "../components/SearchBar";

/**
 * Home is responsible for:
 * - location selection UX
 * - search text state
 * - scrolling to cafeteria list
 */

type HomeProps = {
  office: string | null;
  setOffice: (value: string) => void;
};

export default function Home({ office, setOffice }: HomeProps) {
  // controls visibility of location picker
  const [showModal, setShowModal] = useState(false);

  // search text for restaurants
  const [searchText, setSearchText] = useState("");

  // used for smooth scroll to cafeteria section
  const cafeteriaRef = useRef<HTMLDivElement | null>(null);

  /**
   * On first load:
   * - check if user already selected an office earlier
   * - if not, open location modal automatically
   */
  useEffect(() => {
    const savedOffice = localStorage.getItem("office");

    if (savedOffice) {
      setOffice(savedOffice);
    } else {
      setShowModal(true);
    }
  }, [setOffice]);

  /**
   * Scroll to cafeteria list when user clicks "Explore"
   */
  const handleExploreClick = () => {
    cafeteriaRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ---------- HEADER / HERO ---------- */}
      <Hero
        office={office}
        onExplore={handleExploreClick}
        onChangeLocation={() => setShowModal(true)}
      />

      {/* ---------- SEARCH BAR ---------- 
      <SearchBar
        value={searchText}
        onChange={setSearchText}
        placeholder="Search restaurants"
      />*/}

      {/* ---------- CAFETERIA LIST ---------- */}
      <div ref={cafeteriaRef}>
        <CafeteriaList search={searchText} />
      </div>

      {/* ---------- LOCATION MODAL ---------- */}
      <LocationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={(value) => {
          setOffice(value);
          localStorage.setItem("office", value);
          setShowModal(false);
        }}
      />
    </>
  );
}