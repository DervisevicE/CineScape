import React from "react";
import { useSeriesContext } from "../../context/seriesContex";
import "../list.css"
import Card from "../../components/Card/Card";

const Movies = () => {
  const movieContext = useSeriesContext();
  const { trendingTVShows, showGenres } = movieContext;

  const getGenreNames = (genreIds: number[]) => {
    return genreIds.map((id) => {
      const genre = showGenres.find((genre) => genre.id === id);
      return genre ? genre.name : "Unknown";
    });
  };

  return (
    <div className="movies-container">
      <p className="title">Trending TV Shows</p>
      <div className="grid">
        {trendingTVShows.map((show) => (
          <Card data={show} getGenreNames={getGenreNames} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
