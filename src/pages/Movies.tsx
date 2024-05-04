import React from "react";
import { useMovieContext } from "../context/moviesContext";
import "./movie.css";
import Card from "../components/Card/Card";

const Movies = () => {
  const movieContext = useMovieContext();
  const { trendingMovies, movieGenres } = movieContext;

  const getGenreNames = (genreIds: number[]) => {
    return genreIds.map((id) => {
      const genre = movieGenres.find((genre) => genre.id === id);
      return genre ? genre.name : "Unknown";
    });
  };

  console.log(movieGenres);
  return (
    <div className="movies-container">
      <p className="title">Trending Movies</p>
      <div className="grid">
        {trendingMovies.map((movie) => (
          <Card data={movie} getGenreNames={getGenreNames} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
