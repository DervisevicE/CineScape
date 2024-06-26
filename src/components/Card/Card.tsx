import React from "react";
import "./card.css";
import { useNavigate, useLocation } from "react-router-dom";

interface CardProps {
  data: {
    id: number;
    poster_path: string;
    backdrop_path: string;
    title: string;
    name: string,
    genre_ids: number[];
  };
  getGenreNames: (genreIds: number[]) => string[];
}

const Card: React.FC<CardProps> = ({ data, getGenreNames }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCardClick = () => {
    setTimeout(() => {
      navigate(
        `${location.pathname !== "/" ? location.pathname : "/tv-shows"}/${
          data.id
        }`
      );
    }, 800);
  };

  return (
    <div key={data.id} className="card" onClick={handleCardClick}>
      <div
        className="poster"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data?.poster_path || data?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="card-details">
        <div className="card-title-container">
          <p className="card-title">{data.title || data.name}</p>
        </div>
        <div className="card-genre-container">
          <p className="genre">{getGenreNames(data?.genre_ids).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
