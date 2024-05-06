import React, { useState, useEffect } from "react";
import { useSeriesContext } from "../../context/seriesContex";
import { useSearchContext } from "../../context/searchContext";
import "../list.css";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";

const TVShows = () => {
  const [selectedOption, setSelectedOption] = useState("trending");
  const [animationClass, setAnimationClass] = useState("");

  const movieContext = useSeriesContext();
  const {
    trendingTVShows,
    topRatedTVShows,
    popularTVShows,
    showGenres,
    searchShows,
    searchResults,
  } = movieContext;

  const searchContext = useSearchContext();
  const { searchQuery } = searchContext;

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

  useEffect(() => {
    setAnimationClass("fade-in");
    if (searchQuery.length > 2) {
      setTimeout(() => {
        searchShows(searchQuery);
      }, 1000);
    } else {
      searchShows("");
    }
    //eslint-disable-next-line
  }, [searchQuery]);

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

  const displayShows =
    searchResults.length > 0 ? searchResults : showsToDisplay;

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
        {displayShows.map((show) => (
          <Card data={show} getGenreNames={getGenreNames} />
        ))}
      </div>
      {!searchResults ? (
        <div className="load-more-btn-container">
          <button className="load-more-btn">Load more</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TVShows;
