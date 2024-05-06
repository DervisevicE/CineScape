import React, { useState, useEffect } from "react";
import { useSeriesContext } from "../../context/seriesContex";
import "../list.css";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";
const Movies = () => {
  const [selectedOption, setSelectedOption] = useState("trending");
  const [animationClass, setAnimationClass] = useState("");

  const movieContext = useSeriesContext();
  const { trendingTVShows, topRatedTVShows, popularTVShows, showGenres } =
    movieContext;

  const handleOptionClick = (option: string) => {
    setAnimationClass("fade-out");
    setTimeout(() => {
      setSelectedOption(option);
      setAnimationClass("fade-in");
    }, 300);
  };

  useEffect(() => {
    setAnimationClass("fade-in");
  }, []);

  const getGenreNames = (genreIds: number[]) => {
    return genreIds.map((id) => {
      const genre = showGenres.find((genre) => genre.id === id);
      return genre ? genre.name : "Unknown";
    });
  };

  let showsToDisplay = [];
  switch (selectedOption) {
    case "trending":
      showsToDisplay = trendingTVShows;
      break;
    case "popular":
      showsToDisplay = popularTVShows;
      break;
    case "topRated":
      showsToDisplay = topRatedTVShows;
      break;
    default:
      showsToDisplay = trendingTVShows;
  }

  return (
    <div className="list-container">
      <div className="top-bar-container">
        <p className="title">Discover TV Shows</p>
        <div className="select-options">
          <p
            className={`select-option ${
              selectedOption === "trending" ? "selected" : ""
            }`}
            onClick={() => handleOptionClick("trending")}
          >
            Trending
          </p>
          <p
            className={`select-option ${
              selectedOption === "popular" ? "selected" : ""
            }`}
            onClick={() => handleOptionClick("popular")}
          >
            Popular
          </p>
          <p
            className={`select-option ${
              selectedOption === "topRated" ? "selected" : ""
            }`}
            onClick={() => handleOptionClick("topRated")}
          >
            Top Rated
          </p>
        </div>
        <SearchBar />
      </div>

      <div className={`grid ${animationClass}`}>
        {showsToDisplay.map((show) => (
          <Card data={show} getGenreNames={getGenreNames} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
