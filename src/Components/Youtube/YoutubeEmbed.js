import React, { useEffect } from "react";
import "../Youtube/YoutubeStyles.css";
import {
  getTrailer,
  trailerList,
} from "../../app/features/movies/details/trailerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

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
    <Box
      className="video-responsive"
      position="relative"
      overflow="hidden"
      paddingTop="56.25%">
      {embedId ? (
        <iframe
          className="video-iframe"
          width="100%"
          height="100%"
          src={`https://www.youtube-nocookie.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <p>No trailer available</p>
      )}
    </Box>
  );
};

export default YoutubeEmbed;
