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
  setTrendingPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setTopRatedPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setPopularPageNumber: React.Dispatch<React.SetStateAction<number>>;
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
  const [trendingPageNumber, setTrendingPageNumber] = useState<number>(1);
  const [topRatedPageNumber, setTopRatedPageNumber] = useState<number>(1);
  const [popularPageNumber, setPopularPageNumber] = useState<number>(1);
  const [searchPageNumber, setSearchPageNumber] = useState<number>(1);

  const setResults = (
    optionShows: any[],
    optionPageNumber: number,
    optionSetShows: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    if (optionPageNumber % 2 !== 1) {
      optionSetShows((prev) => {
        let current = [...prev];
        current.splice(
          (optionPageNumber - 1) * 10,
          10,
          ...optionShows.slice(10)
        );
        return current;
      });
    } else {
      optionSetShows((prev) => {
        let current = [...prev];
        current.splice(
          (optionPageNumber - 1) * 10,
          10,
          ...optionShows.slice(0, 10)
        );
        return current;
      });
    }
  };

  useEffect(() => {
    const getTrendingTVShows = async (page: number) => {
      const moviePage = page / 2 < 1 ? 1 : Math.round(page / 2);
      const response = await fetchTrendingTVShows(moviePage);
      const trending = response.results;
      setResults(trending, page, setTrendingTvShows);
    };

    getTrendingTVShows(trendingPageNumber);
  }, [trendingPageNumber]);

  useEffect(() => {
    const getTopRatedTVShows = async (page: number) => {
      const moviePage = page / 2 < 1 ? 1 : Math.round(page / 2);
      const response = await fetchTopratedTVShows(moviePage);
      const topRated = response.results;
      setResults(topRated, page, setTopRatedTVShows);
    };

    getTopRatedTVShows(topRatedPageNumber);
  }, [topRatedPageNumber]);

  useEffect(() => {
    const getPopularTVShows = async (page: number) => {
      const moviePage = page / 2 < 1 ? 1 : Math.round(page / 2);
      const response = await fetchPopularTVShows(moviePage);
      const popular = response.results;
      setResults(popular, page, setPopularTVShows);
    };

    getPopularTVShows(popularPageNumber);
  }, [popularPageNumber]);

  useEffect(() => {
    const getShowGenres = async () => {
      const response = await fetchShowGenres();
      const genres = response.genres;
      setShowGenres(genres);
    };

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

  const searchShows = async (query: string, page: number = 1) => {
    const searchPage = page / 2 < 1 ? 1 : Math.round(page / 2);
    const response = await fetchSearchTVShows(query, searchPage);
    const searched = response.results;
    if (!query) {
      setSearchResults([]);
    } else {
      setResults(searched, page, setSearchResults);
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
    setTrendingPageNumber: setTrendingPageNumber,
    setPopularPageNumber: setPopularPageNumber,
    setTopRatedPageNumber: setTopRatedPageNumber,
    searchResults,
    searchPageNumber,
  };

  return (
    <SeriesContext.Provider value={seriesContextValue}>
      {children}
    </SeriesContext.Provider>
  );
};
