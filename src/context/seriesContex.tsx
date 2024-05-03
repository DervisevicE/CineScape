import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTrendingTVShows,
  fetchTopratedTVShows,
  fetchPopularTVShows,
} from "../api/moviedb";

interface SeriesContextType {
  trendingTVShows: any[];
  topRatedTVShows: any[];
  popularTVShows: any[];
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

  useEffect(() => {
    const getTrendingTVShows = async () => {
      const trending = await fetchTrendingTVShows();
      setTrendingTvShows(trending);
    };

    const getTopRatedTVShows = async () => {
      const topRated = await fetchTopratedTVShows();
      setTopRatedTVShows(topRated);
    };

    const getPopularTVShows = async () => {
      const popular = await fetchPopularTVShows();
      setPopularTVShows(popular);
    };

    getTrendingTVShows();
    getTopRatedTVShows();
    getPopularTVShows();
  }, []);

  const seriesContextValue: SeriesContextType = {
    trendingTVShows,
    topRatedTVShows,
    popularTVShows,
  };

  return (
    <SeriesContext.Provider value={seriesContextValue}>
      {children}
    </SeriesContext.Provider>
  );
};
