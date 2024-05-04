import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTrendingTVShows,
  fetchTopratedTVShows,
  fetchPopularTVShows,
  fetchShowGenres,
} from "../api/moviedb";

interface SeriesContextType {
  trendingTVShows: any[];
  topRatedTVShows: any[];
  popularTVShows: any[];
  showGenres: any[];
}

const SeriesContext = createContext<SeriesContextType | null>(null);

export const useSeriesContext = () => {
  const context = useContext(SeriesContext);
  if (!context) {
    throw new Error("useSeriesContext must be used within a SeriesProvider");
  }
  return context;
};

export const SeriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [trendingTVShows, setTrendingTvShows] = useState<any[]>([]);
  const [topRatedTVShows, setTopRatedTVShows] = useState<any[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<any[]>([]);
  const [showGenres, setShowGenres] = useState<any[]>([]);

  useEffect(() => {
    const getTrendingTVShows = async () => {
      const response = await fetchTrendingTVShows();
      const trending = response.results;
      setTrendingTvShows(trending);
    };

    const getTopRatedTVShows = async () => {
      const response = await fetchTopratedTVShows();
      const topRated = response.results;
      setTopRatedTVShows(topRated);
    };

    const getPopularTVShows = async () => {
      const response = await fetchPopularTVShows();
      const popular = response.results;
      setPopularTVShows(popular);
    };
    const getShowGenres = async () => {
      const response = await fetchShowGenres();
      const genres = response.genres;
      setShowGenres(genres);
    };

    getTrendingTVShows();
    getTopRatedTVShows();
    getPopularTVShows();
    getShowGenres();
  }, []);

  const seriesContextValue: SeriesContextType = {
    trendingTVShows,
    topRatedTVShows,
    popularTVShows,
    showGenres,
  };

  return (
    <SeriesContext.Provider value={seriesContextValue}>
      {children}
    </SeriesContext.Provider>
  );
};
