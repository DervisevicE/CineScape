import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { useMovieContext } from "../context/moviesContext";
import "./details.css";
import DetailsWithoutVideo from "../components/DetailsWithoutVideo/DetailsWithoutVideo";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import DetailsWithVideo from "../components/DetailsWithVideo/DetailsWithVideo";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  poster_path: string;
  backdrop_path: string;
  title: string;
  name:string,
  overview: string;
  genres: Genre[];
}

interface CastMember {
  name: string;
  profile_path: string;
}

const MovieDetails = () => {
  const [loading, setLoading] = useState<Boolean | null>(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [castMembers, setCastMembers] = useState<CastMember[] | null>(null);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  const { id } = useParams();
  const movieContext = useMovieContext();
  const {
    fetchMovieDetails,
    fetchCastMembersForMovie,
    fetchSimilarMovies,
    fetchVideosForMovie,
  } = movieContext;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const movieResponse = await fetchMovieDetails(Number(id));
        setMovie(movieResponse);
        const castResponse = await fetchCastMembersForMovie(Number(id));
        setCastMembers(castResponse);
        const similarMoviesResponse = await fetchSimilarMovies(Number(id));
        setSimilarMovies(similarMoviesResponse);
        const videosResponse = await fetchVideosForMovie(Number(id));
        setVideos(videosResponse);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
    //eslint-disable-next-line
  }, [id]);

  const trailerVideo = videos?.find((video) => video.type === "Trailer");
  const youtubeUrl = trailerVideo
    ? `https://www.youtube.com/embed/${trailerVideo.key}`
    : "";

  return (
    <div className="details-container">
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {movie !== null && Object.keys(movie as Movie).length !== 0 ? (
            <>
              {youtubeUrl ? (
                <DetailsWithVideo
                  data={movie}
                  similar={similarMovies}
                  castMembers={castMembers}
                  youtubeUrl={youtubeUrl}
                />
              ) : (
                <DetailsWithoutVideo
                  data={movie}
                  similar={similarMovies}
                  castMembers={castMembers}
                />
              )}
            </>
          ) : (
            <PageNotFound />
          )}
        </>
      )}
    </div>
  );
};

export default MovieDetails;
