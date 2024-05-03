import React from "react";
import "./App.css";
import {Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
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
     <div className="app-content">
     <Routes>
        <Route path="/" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TVShows />} />
      </Routes>
     </div>
      <Sidebar />
      <Routes />
    </div>
  );
}

export default App;
