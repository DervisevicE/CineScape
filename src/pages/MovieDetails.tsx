import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieContext } from "../context/moviesContext";
import "./details.css";
import DetailsWithoutVideo from "../components/DetailsWithoutVideo/DetailsWithoutVideo";
import PageNotFound from "../components/PageNotFound/PageNotFound";

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
    const fetchData = async () => {
      try {
        const movieResponse = await fetchMovieDetails(Number(id));
        setMovie(movieResponse);
        const castResponse = await fetchCastMembersForMovie(Number(id));
        setCastMembers(castResponse);
        const similarMoviesResponse = await fetchSimilarMovies(Number(id));
        setSimilarMovies(similarMoviesResponse);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
    //eslint-disable-next-line
  }, [id]);

  console.log(movie);
  return (
    <div className="details-container">
      {movie !== null && Object.keys(movie as Movie).length !== 0 ? (
        <DetailsWithoutVideo
          data={movie}
          similar={similarMovies}
          castMembers={castMembers}
        />
      ) : (
        <PageNotFound/>
      )}
    </div>
  );
};

export default MovieDetails;
