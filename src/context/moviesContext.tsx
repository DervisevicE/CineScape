import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopratedMovies,
  fetchMovieGenres,
  fetchMovieDetails,
  fetchCastMembersForMovie,
  fetchSimilarMovies,
  fetchVideosForMovie,
  fetchSearchMovies,
} from "../api/moviedb";

interface MovieContextType {
  trendingMovies: any[];
  upcomingMovies: any[];
  topRatedMovies: any[];
  movieGenres: any[];
  fetchMovieDetails: (movieId: number) => Promise<any>;
  fetchCastMembersForMovie: (movieId: number) => Promise<any>;
  fetchSimilarMovies: (movieId: number) => Promise<any>;
  fetchVideosForMovie: (movieId: number) => Promise<any>;
  searchMovies: (query: string, page: number) => void;
  searchResults: any[];
  searchPageNumber: number;
  setTrendingPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setUpcomingPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setTopRatedPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const MovieContext = createContext<MovieContextType | null>(null);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const [movieGenres, setMovieGenres] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [trendingPageNumber, setTrendingPageNumber] = useState<number>(1);
  const [upcomingPageNumber, setUpcomingPageNumber] = useState<number>(1);
  const [topRatedPageNumber, setTopRatedPageNumber] = useState<number>(1);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);

  useEffect(() => {
    const getTrendingMovies = async (page: number) => {
      const moviePage = page / 2 < 1 ? 1 : Math.round(page / 2);
      const response = await fetchTrendingMovies(moviePage);
      const trending = response.results;
      if (page % 2 !== 1) {
        setTrendingMovies((prev) => {
          let current = [...prev];
          current.splice((page - 1) * 10, 10, ...trending.slice(10));
          return current;
        });
      } else {
        setTrendingMovies((prev) => {
          let current = [...prev];
          current.splice((page - 1) * 10, 10, ...trending.slice(0, 10));
          return current;
        });
      }
    };

    getTrendingMovies(trendingPageNumber);
  }, [trendingPageNumber]);

  useEffect(() => {
    const getUpcomingMovies = async (page: number) => {
      const moviePage = page / 2 < 1 ? 1 : Math.round(page / 2);
      const response = await fetchUpcomingMovies(moviePage);
      const upcoming = response.results;
      if (page % 2 !== 1) {
        setUpcomingMovies((prev) => {
          let current = [...prev];
          current.splice((page - 1) * 10, 10, ...upcoming.slice(10));
          return current;
        });
      } else {
        setUpcomingMovies((prev) => {
          let current = [...prev];
          current.splice((page - 1) * 10, 10, ...upcoming.slice(0, 10));
          return current;
        });
      }
    };

    getUpcomingMovies(upcomingPageNumber);
  }, [upcomingPageNumber]);

  useEffect(() => {
    const getTopRatedMovies = async (page: number) => {
      const moviePage = page / 2 < 1 ? 1 : Math.round(page / 2);
      const response = await fetchTopratedMovies(moviePage);
      const topRated = response.results;
      if (page % 2 !== 1) {
        setTopRatedMovies((prev) => {
          let current = [...prev];
          current.splice((page - 1) * 10, 10, ...topRated.slice(10));
          return current;
        });
      } else {
        setTopRatedMovies((prev) => {
          let current = [...prev];
          current.splice((page - 1) * 10, 10, ...topRated.slice(0, 10));
          return current;
        });
      }
    };

    getTopRatedMovies(topRatedPageNumber);
  }, [topRatedPageNumber]);

  useEffect(() => {
    const getMovieGenres = async () => {
      const response = await fetchMovieGenres();
      const genres = response.genres;
      setMovieGenres(genres);
    };

    getMovieGenres();
  }, []);

  const fetchMovieDetailsById = async (movieId: number) => {
    try {
      const response = await fetchMovieDetails(movieId);
      return response;
    } catch (error) {
      console.log("Error fetching movie details:", error);
      return null;
    }
  };

  const fetchCastMembersForMovieById = async (movieId: number) => {
    try {
      const response = await fetchCastMembersForMovie(movieId);
      return response.cast;
    } catch (error) {
      console.log("Error fetching cast members for movie:", error);
      return null;
    }
  };

  const fetchSimilarMoviesById = async (movieId: number) => {
    try {
      const response = await fetchSimilarMovies(movieId);
      return response.results;
    } catch (error) {
      console.log("Error fetching similar movies:", error);
      return null;
    }
  };

  const fetchVideosForMovieById = async (movieId: number) => {
    try {
      const response = await fetchVideosForMovie(movieId);
      return response.results;
    } catch (error) {
      console.log("Error fetching videos for movie:", error);
      return null;
    }
  };

  const searchMovies = async (query: string, page: number = 1) => {
    const searchPage = page / 2 < 1 ? 1 : Math.round(page / 2);
    const response = await fetchSearchMovies(query, searchPage);
    const searched = response.results;
    if (!query) {
      setSearchResults([]);
    } else if (page % 2 !== 1) {
      setSearchResults((prev) => {
        let current = [...prev];
        current.splice((page - 1) * 10, 10, ...searched.slice(10));
        return current;
      });
    } else {
      setSearchResults((prev) => {
        let current = [...prev];
        current.splice((page - 1) * 10, 10, ...searched.slice(0, 10));
        return current;
      });
    }

    setSearchPageNumber(page);
  };

  const movieContextValue: MovieContextType = {
    trendingMovies,
    upcomingMovies,
    topRatedMovies,
    movieGenres,
    fetchMovieDetails: fetchMovieDetailsById,
    fetchCastMembersForMovie: fetchCastMembersForMovieById,
    fetchSimilarMovies: fetchSimilarMoviesById,
    fetchVideosForMovie: fetchVideosForMovieById,
    searchMovies,
    searchResults,
    searchPageNumber,
    setTrendingPageNumber: setTrendingPageNumber,
    setUpcomingPageNumber: setUpcomingPageNumber,
    setTopRatedPageNumber: setTopRatedPageNumber,
  };

  return (
    <MovieContext.Provider value={movieContextValue}>
      {children}
    </MovieContext.Provider>
  );
};
