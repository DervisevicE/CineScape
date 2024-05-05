import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieContext } from "../context/moviesContext";
import "./details.css";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  genres: Genre[];
}

const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams();
  const movieContext = useMovieContext();
  const { fetchMovieDetails } = movieContext;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetchMovieDetails(Number(id));
        setMovie(response);
      } catch (error) {
        console.log("Error fetching movie details", error);
      }
    };

    fetchMovie();
    //eslint-disable-next-line
  }, [id]);

  console.log(movie)
  return (
    <div className="details-container">
      {movie && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie?.backdrop_path})`,
            }}
          ></div>

          <div className="main-details-container">
            <div className="poster-card">
              <div
                className="details-poster"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie?.poster_path})`,
                }}
              ></div>
            </div>

            <div className="main-details">
              <div className="details-genres">
                {movie.genres.map((genre, index) => (
                  <span key={genre.id}>
                    {index > 0 && " | "}
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="details-title">
                <p>{movie?.title}</p>
              </div>
              <div className="details-overview">
                <p>{movie?.overview}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
