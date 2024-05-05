import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Movies from "./pages/Movies/Movies";
import TVShows from "./pages/TVShows/TVShows";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="app-content">
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
