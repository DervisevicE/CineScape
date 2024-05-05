import React from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/details.css";
import Carousel from "../Carousel/Carousel";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  genres: Genre[];
}

interface CastMember {
  name: string;
  profile_path: string;
}

interface DetailsProps {
  data: Movie | null;
  similar: any[];
  castMembers: CastMember[] | null;
}

const DetailsWithoutVideo: React.FC<DetailsProps> = ({
  data,
  similar,
  castMembers,
}) => {
  const navigate = useNavigate();

  return (
    <div className="details-container">
      {data && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data?.backdrop_path})`,
            }}
          >
            <div className="back-arrow" onClick={() => navigate(-1)}>
              &#10094;
            </div>
          </div>

          <div className="main-details-container">
            <div className="poster-card">
              <div
                className="details-poster"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data?.poster_path})`,
                }}
              ></div>
            </div>

            <div className="main-details">
              <div className="details-genres">
                {data?.genres.map((genre, index) => (
                  <span key={genre.id}>
                    {index > 0 && " | "}
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="details-title">
                <p>{data?.title}</p>
              </div>
              <div className="details-overview">
                <p>{data?.overview}</p>
              </div>
            </div>
          </div>
          <Carousel items={similar} />
        </>
      )}
    </div>
  );
};

export default DetailsWithoutVideo;
