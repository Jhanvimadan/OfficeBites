//one search bar in Navbar that behaves differently on Home vs Menu
import { createContext, useContext, useState } from "react";

//query->what user typed, setQuery->how to update it
const SearchContext = createContext<{
  query: string;
  setQuery: (q: string) => void;
} | null>(null);

//search text is global, navbar updates it, pages read it
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

//
export const useSearch = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be inside SearchProvider");
  return ctx;
};
