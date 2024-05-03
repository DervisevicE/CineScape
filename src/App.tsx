import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { useMovieDBContext } from "./context/movieDBContext";
function App() {
  const movieContext = useMovieDBContext();

  const { trendingMovies } = movieContext;

  console.log(trendingMovies);

  return (
    <div className="app">
      <Sidebar />
      <div className="app-content">content</div>
    </div>
  );
}

export default App;
