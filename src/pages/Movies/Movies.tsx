import React, { useState, useEffect } from "react";
import { useMovieContext } from "../../context/moviesContext";
import { useSearchContext } from "../../context/searchContext";
import "../list.css";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";

const Movies = () => {
  const [selectedOption, setSelectedOption] = useState("trending");
  const [animationClass, setAnimationClass] = useState("");

  const movieContext = useMovieContext();
  const {
    trendingMovies,
    upcomingMovies,
    topRatedMovies,
    movieGenres,
    searchResults,
    searchMovies,
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
        searchMovies(searchQuery);
      }, 1000);
    } else {
      searchMovies("");
    }
    //eslint-disable-next-line
  }, [searchQuery]);

  const getGenreNames = (genreIds: number[]) => {
    return genreIds.map((id) => {
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

  return (
    <div className="list-container">
      <div className="top-bar-container">
        <p className="title">Discover Movies</p>
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
        <SearchBar />
      </div>
      <div className={`grid ${animationClass}`}>
        {displayMovies.map((movie) => (
          <Card key={movie.id} data={movie} getGenreNames={getGenreNames} />
        ))}
      </div>
      <div>
        {!searchResults ? (
          <div className="load-more-btn-container">
            <button className="load-more-btn">Load more</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Movies;
