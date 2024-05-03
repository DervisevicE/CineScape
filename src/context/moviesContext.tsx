import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopratedMovies,
} from "../api/moviedb";

interface MovieContextType {
  trendingMovies: any[];
  upcomingMovies: any[];
  topRatedMovies: any[];
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

  useEffect(() => {
    const getTrendingMovies = async () => {
      const trending = await fetchTrendingMovies();
      setTrendingMovies(trending);
    };

    const getUpcomingMovies = async () => {
      const upcoming = await fetchUpcomingMovies();
      setUpcomingMovies(upcoming);
    };

    const getTopRatedMovies = async () => {
      const topRated = await fetchTopratedMovies();
      setTopRatedMovies(topRated);
    };

    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const movieContextValue: MovieContextType = {
    trendingMovies,
    upcomingMovies,
    topRatedMovies,
  };

  return (
    <MovieContext.Provider value={movieContextValue}>
      {children}
    </MovieContext.Provider>
  );
};
