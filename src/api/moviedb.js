import axios from "axios";

const apiKey = "cdedb12421f3da7a398b7376c8346a86"
const apiUrl = "https://api.themoviedb.org/3"

const trendingMovies = `${apiUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMovies = `${apiUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMovies = `${apiUrl}/movie/top_rated?api_key=${apiKey}`

export const fetchTrendingMovies = async () => {
    try {
        const response = await axios.get(trendingMovies);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
};


export const fetchUpcomingMovies = async () => {
    try {
        const response = await axios.get(upcomingMovies);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
};


export const fetchTopratedMovies = async () => {
    try {
        const response = await axios.get(topRatedMovies);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
};

export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
}

export const fetchCastMembers = async (movieId) => {
    try {
        const response = await axios.get(`${apiUrl}/movie/${movieId}/credits?api_key=${apiKey}`);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
}

export const fetchSimilarMovies = async (movieId) => {
    try {
        const response = await axios.get(`${apiUrl}/movie/${movieId}/similar?api_key=${apiKey}`);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
}

export const fetchSearchMovies = async (query) => {
    try {
        const response = await axios.get(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
}