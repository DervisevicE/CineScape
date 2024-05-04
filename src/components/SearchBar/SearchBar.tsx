import React from "react";
import "./searchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <input type="text" className="search-bar" placeholder="Search here..." />
    </div>
  );
};

export default SearchBar;
