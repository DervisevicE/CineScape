import React, { useState, useEffect } from "react";
import { useMovieContext } from "../../context/moviesContext";
import "../list.css";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";

const Movies = () => {
  const [selectedOption, setSelectedOption] = useState("trending");
  const [animationClass, setAnimationClass] = useState("");

  const movieContext = useMovieContext();
  const { trendingMovies, upcomingMovies, topRatedMovies, movieGenres } =
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
        {moviesToDisplay.map((movie) => (
          <Card key={movie.id} data={movie} getGenreNames={getGenreNames} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
