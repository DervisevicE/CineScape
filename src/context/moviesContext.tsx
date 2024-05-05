import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopratedMovies,
  fetchMovieGenres,
  fetchMovieDetails,
} from "../api/moviedb";

interface MovieContextType {
  trendingMovies: any[];
  upcomingMovies: any[];
  topRatedMovies: any[];
  movieGenres: any[];
  fetchMovieDetails: (movieId: number) => Promise<any>;
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

  useEffect(() => {
    const getTrendingMovies = async () => {
      const response = await fetchTrendingMovies();
      const trending = response.results;
      setTrendingMovies(trending);
    };

    const getUpcomingMovies = async () => {
      const response = await fetchUpcomingMovies();
      const upcoming = response.results;
      setUpcomingMovies(upcoming);
    };

    const getTopRatedMovies = async () => {
      const response = await fetchTopratedMovies();
      const topRated = response.results;
      setTopRatedMovies(topRated);
    };

    const getMovieGenres = async () => {
      const response = await fetchMovieGenres();
      const genres = response.genres;
      setMovieGenres(genres);
    };

    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
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

  const movieContextValue: MovieContextType = {
    trendingMovies,
    upcomingMovies,
    topRatedMovies,
    movieGenres,
    fetchMovieDetails: fetchMovieDetailsById,
  };

  return (
    <MovieContext.Provider value={movieContextValue}>
      {children}
    </MovieContext.Provider>
  );
};
