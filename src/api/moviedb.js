import axios from "axios";

const apiKey = "cdedb12421f3da7a398b7376c8346a86";
const apiUrl = "https://api.themoviedb.org/3";

const trendingMovies = `${apiUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMovies = `${apiUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMovies = `${apiUrl}/movie/top_rated?api_key=${apiKey}`;
const trendingTVShows = `${apiUrl}/trending/tv/day?api_key=${apiKey}`;
const topRatedTVShows = `${apiUrl}/tv/top_rated?api_key=${apiKey}`;
const popularTVShows = `${apiUrl}/tv/popular?api_key=${apiKey}`;

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(trendingMovies);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await axios.get(upcomingMovies);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchTopratedMovies = async () => {
  try {
    const response = await axios.get(topRatedMovies);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(
      `${apiUrl}/movie/${movieId}?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchCastMembersForMovie = async (movieId) => {
  try {
    const response = await axios.get(
      `${apiUrl}/movie/${movieId}/credits?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchSimilarMovies = async (movieId) => {
  try {
    const response = await axios.get(
      `${apiUrl}/movie/${movieId}/similar?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchSearchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`
    );
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchTrendingTVShows = async () => {
  try {
    const response = await axios.get(trendingTVShows);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchTopratedTVShows = async () => {
  try {
    const response = await axios.get(topRatedTVShows);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchPopularTVShows = async () => {
  try {
    const response = await axios.get(popularTVShows);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchTVShowetails = async (seriesId) => {
  try {
    const response = await axios.get(
      `${apiUrl}/tv/${seriesId}?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchCastMembersForTVShow = async (seriesId) => {
  try {
    const response = await axios.get(
      `${apiUrl}/tv/${seriesId}/credits?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchSimilarTVShows = async (seriesId) => {
  try {
    const response = await axios.get(
      `${apiUrl}/tv/${seriesId}/similar?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchSearchTVShows = async (query) => {
  try {
    const response = await axios.get(
      `${apiUrl}/search/tv?api_key=${apiKey}&query=${query}`
    );
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};
