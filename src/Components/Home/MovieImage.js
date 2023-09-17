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
      boxShadow="lg" // Görselin üzerine hafif bir gölge ekler
      border="4px solid teal" // Kenarlık ekler
      _hover={{
        transform: "scale(1.05)",
        transition: "transform 0.2s ease-in-out",
        cursor: "pointer",
      }} // Görselin üzerine gelindiğinde büyüme efekti ekler
      transition="border 0.2s ease-in-out" // Kenarlık renginin değişimini yumuşatır
    />
  );
}

export default MovieImage;
