import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSeriesContext } from "../context/seriesContex";
import "./details.css";
import DetailsWithoutVideo from "../components/DetailsWithoutVideo/DetailsWithoutVideo";
import DetailsWithVideo from "../components/DetailsWithVideo/DetailsWithVideo";
import PageNotFound from "../components/PageNotFound/PageNotFound";

interface Genre {
  id: number;
  name: string;
}

interface TVShow {
  poster_path: string;
  backdrop_path: string;
  title: string;
  name: string,
  overview: string;
  genres: Genre[];
}

interface CastMember {
  name: string;
  profile_path: string;
}

const TVShowDetails = () => {
  const [loading, setLoading] = useState<Boolean | null>(false);
  const [show, setShow] = useState<TVShow | null>(null);
  const [castMembers, setCastMembers] = useState<CastMember[] | null>(null);
  const [similarShows, setSimilarShows] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  const { id } = useParams();
  const seriesContex = useSeriesContext();
  const {
    fetchTVShowDetails,
    fetchCastMembersForTVShow,
    fetchSimilarTVShows,
    fetchVideosForShow,
  } = seriesContex;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const showResponse = await fetchTVShowDetails(Number(id));
        setShow(showResponse);
        const castResponse = await fetchCastMembersForTVShow(Number(id));
        setCastMembers(castResponse);
        const similarShowsResponse = await fetchSimilarTVShows(Number(id));
        setSimilarShows(similarShowsResponse);
        const videosResponse = await fetchVideosForShow(Number(id));
        setVideos(videosResponse);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
    //eslint-disable-next-line
  }, [id]);

  const trailerVideo = videos?.find((video) => video.type === "Trailer");
  const youtubeUrl = trailerVideo
    ? `https://www.youtube.com/embed/${trailerVideo.key}`
    : "";

  console.log(youtubeUrl);
  return (
    <div className="details-container">
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {show !== null && Object.keys(show as TVShow).length !== 0 ? (
            <>
              {youtubeUrl ? (
                <DetailsWithVideo
                  data={show}
                  similar={similarShows}
                  castMembers={castMembers}
                  youtubeUrl={youtubeUrl}
                />
              ) : (
                <DetailsWithoutVideo
                  data={show}
                  similar={similarShows}
                  castMembers={castMembers}
                />
              )}
            </>
          ) : (
            <PageNotFound />
          )}
        </>
      )}
    </div>
  );
};

export default TVShowDetails;
