import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./carousel.css";

interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
}

interface Props {
  items: Movie[];
}

const Carousel: React.FC<Props> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const numItems = items.length;

  const location = useLocation();
  const isMovies = location.pathname.includes("/movies");

  const navigate = useNavigate();

  console.log(location);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === numItems - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? numItems - 1 : prevIndex - 1
    );
  };

  const handleCardClick = (id: number) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="similar-container">
      <p className="title">
        {isMovies ? "Similar Movies" : "Similar TV Shows"}
      </p>
      <div className="carousel-container">
        <button className="carousel-arrow prev" onClick={goToPrev}>
          &#10094;
        </button>
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${(currentIndex / numItems) * 100}%)`,
          }}
        >
          {items.map((item: Movie, index: number) => (
            <div
              className="carousel-card card"
              key={index}
              onClick={() => handleCardClick(item.id)}
            >
              <div
                className="poster"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item?.poster_path})`,
                }}
              ></div>
              <div className="card-details">
                <p className="card-title">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-arrow next" onClick={goToNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
