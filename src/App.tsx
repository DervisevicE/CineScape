import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
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
      <div className="app-content">content</div>
    </div>
  );
}

export default App;
