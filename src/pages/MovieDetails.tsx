import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/moviesContext";
import "./details.css";
import Carousel from "../components/Carousel/Carousel";

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

interface CastMember {
  name: string;
  profile_path: string;
}

const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [castMembers, setCastMembers] = useState<CastMember[] | null>(null);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);

  const navigate = useNavigate();

  const { id } = useParams();
  const movieContext = useMovieContext();
  const { fetchMovieDetails, fetchCastMembersForMovie, fetchSimilarMovies } =
    movieContext;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetchMovieDetails(Number(id));
        setMovie(response);
      } catch (error) {
        console.log("Error fetching movie details", error);
      }
    };

    const fetchCastMembers = async () => {
      try {
        const response = await fetchCastMembersForMovie(Number(id));
        setCastMembers(response);
      } catch (error) {
        console.log("Error fetching movie details", error);
      }
    };

    const fetchSimilarMoviesById = async () => {
      try {
        const response = await fetchSimilarMovies(Number(id));
        setSimilarMovies(response);
      } catch (error) {
        console.log("Error fetching movie details", error);
      }
    };

    fetchMovie();
    fetchCastMembers();
    fetchSimilarMoviesById();
    //eslint-disable-next-line
  }, [id]);

  console.log(similarMovies);
  return (
    <div className="details-container">
      {movie && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie?.backdrop_path})`,
            }}
          >
            <div className="back-arrow" onClick={() => navigate(-1)}>
              &#10094;
            </div>
          </div>

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
          <Carousel items={similarMovies} />
        </>
      )}
    </div>
  );
};

export default MovieDetails;
