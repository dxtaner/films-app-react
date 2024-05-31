import React from "react";
import { Box } from "@chakra-ui/react";

const MovieImage = ({ movie, handleShowDetails }) => {
  const imagePath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "https://via.placeholder.com/250x375?text=No+Image";

  return (
    <Box
      as="img"
      src={imagePath}
      alt={movie.poster_path ? `${movie.title} poster` : "No Image"}
      onClick={() => handleShowDetails(movie.id)}
      cursor="pointer"
      position="relative"
      loading="lazy"
    />
  );
};

export default MovieImage;
