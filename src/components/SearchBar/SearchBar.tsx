import React from "react";
import { useSearchContext } from "../../context/searchContext";
import "./searchBar.css";

const SearchBar = () => {
  const { searchQuery, setSearch } = useSearchContext();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search here..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
