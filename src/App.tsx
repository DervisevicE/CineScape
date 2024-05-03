import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="app-content">content</div>
    </div>
  );
}

export default App;
