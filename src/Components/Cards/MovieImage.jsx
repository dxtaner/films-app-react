import React from "react";
import { Box, Image } from "@chakra-ui/react";

const MovieImage = ({ movie, handleShowDetails }) => {
  const imagePath = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "https://via.placeholder.com/250x375?text=Görsel+Yok";

  return (
    <Box
      overflow="hidden"
      borderRadius="lg"
      cursor="pointer"
      onClick={() => handleShowDetails(movie.id)}
      position="relative"
      w="100%"
      h="100%"
    >
      <Image
        src={imagePath}
        alt={movie?.title ? `${movie.title} poster` : "No Image"}
        objectFit="cover"
        w="100%"
        h="100%"
        transition="transform 0.3s ease-in-out"
        _hover={{ transform: "scale(1.05)" }}
        loading="lazy"
      />
    </Box>
  );
};

export default MovieImage;
