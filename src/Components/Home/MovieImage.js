import React from "react";
import { Image } from "@chakra-ui/react";
import movieImage from "./movieImage.jpg";

function MovieImage() {
  return (
    <Image
      src={movieImage}
      alt="Film"
      mb={4}
      rounded="md"
      w="100%"
      boxShadow="lg"
      border="4px solid teal"
      _hover={{
        transform: "scale(1.05)",
        cursor: "pointer",
      }}
      transition="transform 0.2s ease-in-out"
    />
  );
}

export default MovieImage;
