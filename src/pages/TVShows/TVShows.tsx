import React, { useState, useEffect } from "react";
import { useSeriesContext } from "../../context/seriesContex";
import { useSearchContext } from "../../context/searchContext";
import "../list.css";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";

const TVShows = () => {
  const [selectedOption, setSelectedOption] = useState("trending");
  const [animationClass, setAnimationClass] = useState("");
  const [keystrokeTime, setKeystrokeTime] = useState<Date>(new Date());

  const tvShowsContext = useSeriesContext();
  const {
    trendingTVShows,
    topRatedTVShows,
    popularTVShows,
    showGenres,
    searchShows,
    searchResults,
    setPageNumber,
  } = tvShowsContext;

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
      const search = () => {
        const time = new Date().getTime() - keystrokeTime.getTime();
        if (time > 900) {
          console.log("YESSSS");
          console.log(time);
          searchShows(searchQuery);
        }
      };
      setTimeout(() => search(), 1000);
    } else {
      searchShows("");
    }
    //eslint-disable-next-line
  }, [keystrokeTime, searchQuery]);

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

  const handleLoadMoreClick = () => {
    setPageNumber((prev) => prev + 1);
    console.log("LOADING");
  };
  return (
    <div className="list-container">
      <div className="top-bar-container">
        <p className="title">Discover TV Shows</p>
        {!searchResults.length && (
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
        )}
        <SearchBar onChange={() => setKeystrokeTime(new Date())} />
      </div>

      <div className={`grid ${animationClass}`}>
        {displayShows.map((show) => (
          <Card data={show} getGenreNames={getGenreNames} />
        ))}
      </div>
      <div className="load-more-btn-container">
        <button onClick={handleLoadMoreClick} className="load-more-btn">
          Load more
        </button>
      </div>
    </div>
  );
};

export default TVShows;
