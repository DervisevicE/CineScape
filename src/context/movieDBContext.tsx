import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/moviedb";

interface MovieContextType {
  trendingMovies: any[];
}

const MovieDBContext = createContext<MovieContextType | null>(null);

export const useMovieDBContext = () => {
  const context = useContext(MovieDBContext);
  if (!context) {
    throw new Error("useMovieDBContext must be used within a MovieDBProvider");
  }
  return context;
};

export const MovieDBProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const trending = await fetchTrendingMovies();
      setTrendingMovies(trending);
    };
    fetchData();
  }, []);

  const movieContextValue: MovieContextType = {
    trendingMovies,
  };

  return (
    <MovieDBContext.Provider value={movieContextValue}>
      {children}
    </MovieDBContext.Provider>
  );
};
