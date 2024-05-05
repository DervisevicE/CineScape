import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieContext } from "../context/moviesContext";
import "./details.css";
import DetailsWithoutVideo from "../components/DetailsWithoutVideo/DetailsWithoutVideo";

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
        <DetailsWithoutVideo
          data={movie}
          similar={similarMovies}
          castMembers={castMembers}
        />
      )}
    </div>
  );
};

export default MovieDetails;
