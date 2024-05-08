import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../Carousel/Carousel";
import NoImage from "../../assets/no-image.jpeg";


interface Genre {
  id: number;
  name: string;
}

interface Data {
  poster_path: string;
  backdrop_path: string;
  title: string;
  name: string;
  overview: string;
  genres: Genre[];
}

interface CastMember {
  name: string;
  profile_path: string;
}

interface DetailsProps {
  data: Data | null;
  similar: any[];
  castMembers: CastMember[] | null;
  youtubeUrl: string;
}

const Details: React.FC<DetailsProps> = ({
  data,
  similar,
  castMembers,
  youtubeUrl,
}) => {
  const navigate = useNavigate();

  return (
    <div className="details-container">
      {data && (
        <>
          <div
            className={youtubeUrl ? "video-banner" : "banner"}
            style={{
              backgroundImage: !youtubeUrl
                ? `url(https://image.tmdb.org/t/p/w500/${
                    data?.backdrop_path || data?.poster_path
                  })`
                : "",
            }}
          >
            {youtubeUrl && (
              <iframe
                width="100%"
                height="100%"
                src={youtubeUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            <div className="back-arrow-container" onClick={() => navigate(-1)}>
              <div className="back-arrow">&#10094;</div>
            </div>
          </div>

          <div className="main-details-container">
            <div className={youtubeUrl ? "video-poster-card" : "poster-card"}>
              <div
                className="details-poster"
                style={{
                  backgroundImage: `url(${
                    data.poster_path
                      ? "https://image.tmdb.org/t/p/w500/" + data.poster_path
                      : data.backdrop_path
                      ? "https://image.tmdb.org/t/p/w500/" + data.backdrop_path
                      : NoImage
                  })`,
                }}
              ></div>
            </div>

            <div className={youtubeUrl ? "video-main-details" : "main-details"}>
              <div className="details-genres">
                {data?.genres?.map((genre, index) => (
                  <span key={genre.id}>
                    {index > 0 && " | "}
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="details-title">
                <p>{data?.title || data?.name}</p>
              </div>
              <div className="details-overview">
                <p>{data?.overview}</p>
              </div>

              <div className="cast-member-list">
                {castMembers?.map((member, index) => (
                  <div key={index} className="cast-member-item">
                    <p className="cast-member-name">{member.name}</p>
                    {index !== castMembers.length - 1 && (
                      <hr className="divider" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {similar && <Carousel items={similar} />}
        </>
      )}
    </div>
  );
};

export default Details;
