import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MovieProvider } from "./context/moviesContext";
import { SeriesProvider } from "./context/seriesContex";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/searchContext";
import { MenuProvider } from "./context/menuContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuProvider>
        <MovieProvider>
          <SeriesProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </SeriesProvider>
        </MovieProvider>
      </MenuProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
