import React from "react";
import { useSearchContext } from "../../context/searchContext";
import "./searchBar.css";

export interface SearchBarProps {
  onChange?: () => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  const { searchQuery, setSearch } = useSearchContext();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.();
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
