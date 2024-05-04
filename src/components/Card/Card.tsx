// Card.jsx

import React from "react";
import "./card.css";

interface CardProps {
  data: {
    id: number;
    poster_path: string;
    title: string;
    genre_ids: number[];
  };
  getGenreNames: (genreIds: number[]) => string[];
}

const Card: React.FC<CardProps> = ({ data, getGenreNames }) => {
  return (
    <div key={data.id} className="card">
      <div
        className="poster"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="card-details">
        <div className="card-title-container">
          <p className="card-title">{data.title}</p>
        </div>
        <div className="card-genre-container">
          <p className="genre">{getGenreNames(data.genre_ids).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;