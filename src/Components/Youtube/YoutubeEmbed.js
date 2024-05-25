import React, { useEffect } from "react";
import "../Youtube/YoutubeStyles.css";
import {
  getTrailer,
  trailerList,
} from "../../app/features/movies/details/trailerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Text } from "@chakra-ui/react";

const YoutubeEmbed = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movieTrailer = useSelector(trailerList);

  useEffect(() => {
    if (id) {
      dispatch(getTrailer(id));
    }
  }, [dispatch, id]);

  if (!movieTrailer) {
    return <Text align={"center"}>Yükleniyor...</Text>;
  }

  const embedId = movieTrailer?.find(
    (trailer) => trailer.type === "Trailer"
  )?.key;

  if (!embedId) {
    return <Text align={"center"}>Fragman mevcut değil</Text>;
  }

  return (
    <div className="video-container">
      {embedId ? (
        <iframe
          className="video-iframe"
          width="853"
          height="480"
          src={`https://www.youtube-nocookie.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      ) : (
        <p>No trailer available</p>
      )}
    </div>
  );
};

export default YoutubeEmbed;
