import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSeriesContext } from "../context/seriesContex";
import "./details.css";
import DetailsWithoutVideo from "../components/DetailsWithoutVideo/DetailsWithoutVideo";
import PageNotFound from "../components/PageNotFound/PageNotFound";

interface Genre {
  id: number;
  name: string;
}

interface TVShow {
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

const TVShowDetails = () => {
  const [show, setShow] = useState<TVShow | null>(null);
  const [castMembers, setCastMembers] = useState<CastMember[] | null>(null);
  const [similarShows, setSimilarShows] = useState<any[]>([]);

  const { id } = useParams();
  const seriesContex = useSeriesContext();
  const { fetchTVShowDetails, fetchCastMembersForTVShow, fetchSimilarTVShows } =
    seriesContex;

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetchTVShowDetails(Number(id));
        setShow(response);
      } catch (error) {
        console.log("Error fetching show details", error);
      }
    };

    const fetchCastMembers = async () => {
      try {
        const response = await fetchCastMembersForTVShow(Number(id));
        setCastMembers(response);
      } catch (error) {
        console.log("Error fetching show details", error);
      }
    };

    const fetchSimilarMoviesById = async () => {
      try {
        const response = await fetchSimilarTVShows(Number(id));
        setSimilarShows(response);
      } catch (error) {
        console.log("Error fetching  similar shows", error);
      }
    };

    fetchShow();
    fetchCastMembers();
    fetchSimilarMoviesById();
    //eslint-disable-next-line
  }, [id]);

  return (
    <div className="details-container">
      {show !== null && Object.keys(show as TVShow).length !== 0 ? (
        <DetailsWithoutVideo
          data={show}
          similar={similarShows}
          castMembers={castMembers}
        />
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default TVShowDetails;
