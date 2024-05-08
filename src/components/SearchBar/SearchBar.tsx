import React from "react";
import { useSearchContext } from "../../context/searchContext";
import "./searchBar.css";

const SearchBar = () => {
  const { searchQuery, setSearch } = useSearchContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClearClick = () => {
    setSearch("");
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-relative">
        <input
          type="text"
          className="search-bar"
          placeholder="Search here..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        {searchQuery && (
          <button className="clear-button" onClick={handleClearClick}>
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
