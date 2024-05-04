import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Movies from "./pages/Movies/Movies";
import TVShows from "./pages/TVShows/TVShows";
import SearchBar from "./components/SearchBar/SearchBar";
// import { useMovieContext } from "./context/moviesContext";
// import { useSeriesContext } from "./context/seriesContex";
function App() {
  // const movieContext = useMovieContext();
  // const seriesContex = useSeriesContext();

  // const { trendingMovies } = movieContext;
  // const {popularTVShows} = seriesContex

  // console.log(popularTVShows);

  return (
    <div className="app">
      <Sidebar />
      <div className="app-content">
        <SearchBar />
        <Routes>
          <Route path="/" element={<TVShows />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-shows" element={<TVShows />} />
        </Routes>
      </div>
      <Routes />
    </div>
  );
}

export default App;
