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
  searchShows: (query: string, page: number) => void;
  searchResults: any[];
  searchPageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
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
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);

  useEffect(() => {
    const getTrendingTVShows = async (page: number) => {
      const moviePage = page / 2 < 1 ? 1 : Math.round(page / 2);
      const response = await fetchTrendingTVShows(moviePage);
      const trending = response.results;
      if (page % 2 !== 1) {
        setTrendingTvShows((prev) => {
          let current = [...prev];
          current.splice((page - 1) * 10, 10, ...trending.slice(10));
          return current;
        });
      } else {
        setTrendingTvShows((prev) => {
          let current = [...prev];
          current.splice((page - 1) * 10, 10, ...trending.slice(0, 10));
          return current;
        });
      }
    };

    const getTopRatedTVShows = async (page: number) => {
      const moviePage = page / 2 < 1 ? 1 : Math.round(page / 2);
      const response = await fetchTopratedTVShows(moviePage);
      const topRated = response.results;
      if (page % 2 !== 1) {
        setTopRatedTVShows((prev) => {
          let current = [...prev];
          current.splice((page - 1) * 10, 10, ...topRated.slice(10));
          return current;
        });
      } else {
        setTopRatedTVShows((prev) => {
          let current = [...prev];
          current.splice((page - 1) * 10, 10, ...topRated.slice(0, 10));
          return current;
        });
      }
    };

    const getPopularTVShows = async (page: number) => {
      const moviePage = page / 2 < 1 ? 1 : Math.round(page / 2);
      const response = await fetchPopularTVShows(moviePage);
      const popular = response.results;
      if (page % 2 !== 1) {
        setPopularTVShows((prev) => {
          let current = [...prev];
          current.splice((page - 1) * 10, 10, ...popular.slice(10));
          return current;
        });
      } else {
        setPopularTVShows((prev) => {
          let current = [...prev];
          current.splice((page - 1) * 10, 10, ...popular.slice(0, 10));
          return current;
        });
      }
    };
    const getShowGenres = async () => {
      const response = await fetchShowGenres();
      const genres = response.genres;
      setShowGenres(genres);
    };

    getTrendingTVShows(pageNumber);
    getTopRatedTVShows(pageNumber);
    getPopularTVShows(pageNumber);
    getShowGenres();
  }, [pageNumber]);

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

  const searchShows = async (query: string, page: number = 1) => {
    const searchPage = page / 2 < 1 ? 1 : Math.round(page / 2);
    const response = await fetchSearchTVShows(query, searchPage);
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
    setPageNumber,
    searchResults,
    searchPageNumber,
  };

  return (
    <SeriesContext.Provider value={seriesContextValue}>
      {children}
    </SeriesContext.Provider>
  );
};
