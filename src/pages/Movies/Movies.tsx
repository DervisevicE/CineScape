import React, { useState, useEffect } from "react";
import { useMovieContext } from "../../context/moviesContext";
import { useSearchContext } from "../../context/searchContext";
import "../list.css";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";

const Movies = () => {
  const [selectedOption, setSelectedOption] = useState<string>("trending");
  const [animationClass, setAnimationClass] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const movieContext = useMovieContext();
  const {
    trendingMovies,
    upcomingMovies,
    topRatedMovies,
    movieGenres,
    searchResults,
    searchMovies,
    searchPageNumber,
    setPageNumber,
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
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(() => {
        searchMovies(searchQuery, 1);
      }, 1000);
      setTimeoutId(id);
    } else {
      searchMovies("", 1);
    }
    //eslint-disable-next-line
  }, [searchQuery]);

  const getGenreNames = (genreIds: number[]) => {
    return genreIds?.map((id) => {
      const genre = movieGenres.find((genre) => genre.id === id);
      return genre ? genre.name : "Unknown";
    });
  };

  let moviesToDisplay = [];
  switch (selectedOption) {
    case "trending":
      moviesToDisplay = trendingMovies;
      break;
    case "upcoming":
      moviesToDisplay = upcomingMovies;
      break;
    case "topRated":
      moviesToDisplay = topRatedMovies;
      break;
    default:
      moviesToDisplay = trendingMovies;
  }

  const displayMovies =
    searchResults.length > 0 ? searchResults : moviesToDisplay;

  const handleLoadMoreClick = () => {
    if (searchResults.length > 0) {
      const nextPage = searchPageNumber + 1;
      searchMovies(searchQuery, nextPage);
    } else {
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <div className="list-container">
      <div className="top-bar-container">
        <p className="title">Discover Movies</p>
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
                selectedOption === "upcoming" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("upcoming")}
            >
              Upcoming
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
        {displayMovies?.map((movie) => (
          <Card key={movie.id} data={movie} getGenreNames={getGenreNames} />
        ))}
      </div>
      {displayMovies.length > 0 && (
        <div className="load-more-btn-container">
          <button onClick={handleLoadMoreClick} className="load-more-btn">
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;
