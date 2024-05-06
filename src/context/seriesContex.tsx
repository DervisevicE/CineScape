import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTrendingTVShows,
  fetchTopratedTVShows,
  fetchPopularTVShows,
  fetchShowGenres,
  fetchTVShowDetails,
  fetchCastMembersForTVShow,
  fetchSimilarTVShows,
  fetchVideosForShow,
  fetchSearchTVShows,
} from "../api/moviedb";

interface SeriesContextType {
  trendingTVShows: any[];
  topRatedTVShows: any[];
  popularTVShows: any[];
  showGenres: any[];
  fetchTVShowDetails: (showId: number) => Promise<any>;
  fetchCastMembersForTVShow: (showId: number) => Promise<any>;
  fetchSimilarTVShows: (showId: number) => Promise<any>;
  fetchVideosForShow: (showId: number) => Promise<any>;
  searchShows: (query: string) => void;
  searchResults: any[];
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
  const [searchResults, setSearchResults] = useState<any[]>([]);

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

  const fetchTVShowDetailsById = async (showId: number) => {
    try {
      const response = await fetchTVShowDetails(showId);
      return response;
    } catch (error) {
      console.log("Error fetching show details:", error);
      return null;
    }
  };

  const fetchCastMembersForTVShowById = async (showId: number) => {
    try {
      const response = await fetchCastMembersForTVShow(showId);
      return response.cast;
    } catch (error) {
      console.log("Error fetching cast members for show:", error);
      return null;
    }
  };

  const fetchSimilarTVShowsById = async (showId: number) => {
    try {
      const response = await fetchSimilarTVShows(showId);
      return response.results;
    } catch (error) {
      console.log("Error fetching cast similar shows:", error);
      return null;
    }
  };

  const fetchVideosForShowById = async (showId: number) => {
    try {
      const response = await fetchVideosForShow(showId);
      return response.results;
    } catch (error) {
      console.log("Error fetching cast videos for show:", error);
      return null;
    }
  };

  const searchShows = async (query: string) => {
    const results = await fetchSearchTVShows(query);
    setSearchResults(results.results || []);
  };

  const seriesContextValue: SeriesContextType = {
    trendingTVShows,
    topRatedTVShows,
    popularTVShows,
    showGenres,
    fetchTVShowDetails: fetchTVShowDetailsById,
    fetchCastMembersForTVShow: fetchCastMembersForTVShowById,
    fetchSimilarTVShows: fetchSimilarTVShowsById,
    fetchVideosForShow: fetchVideosForShowById,
    searchShows,
    searchResults,
  };

  return (
    <SeriesContext.Provider value={seriesContextValue}>
      {children}
    </SeriesContext.Provider>
  );
};
