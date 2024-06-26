import React, { useState, useEffect } from "react";
import { useSeriesContext } from "../../context/seriesContex";
import { useSearchContext } from "../../context/searchContext";
import "../list.css";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";

const TVShows = () => {
  const [selectedOption, setSelectedOption] = useState("trending");
  const [animationClass, setAnimationClass] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const tvShowsContext = useSeriesContext();
  const {
    trendingTVShows,
    topRatedTVShows,
    popularTVShows,
    showGenres,
    searchShows,
    searchResults,
    searchPageNumber,
    setPopularPageNumber,
    setTopRatedPageNumber,
    setTrendingPageNumber,
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
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(() => {
        searchShows(searchQuery, 1);
      }, 1000);
      setTimeoutId(id);
    } else {
      searchShows("", 1);
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

  const handleLoadMoreClick = () => {
    if (searchResults.length > 0) {
      const nextPage = searchPageNumber + 1;
      searchShows(searchQuery, nextPage);
    } else {
      if (selectedOption === "trending") {
        setTrendingPageNumber((prev) => prev + 1);
      } else if (selectedOption === "popular") {
        setPopularPageNumber((prev) => prev + 1);
      } else {
        setTopRatedPageNumber((prev) => prev + 1);
      }
    }
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
        <SearchBar />
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
