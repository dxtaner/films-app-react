import React from "react";
import { Image, Box } from "@chakra-ui/react";
import movieImage from "./movieImage.jpg";

function MovieImage() {
  return (
    <Box
      overflow="hidden"
      borderRadius="2xl"
      boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.7)"
      position="relative"
      role="group"
      border="1px solid"
      borderColor="gray.800"
    >
      <Image
        src={movieImage}
        alt="Film Dünyası"
        w="100%"
        h="auto"
        objectFit="cover"
        transition="transform 0.5s ease"
        _groupHover={{
          transform: "scale(1.06)",
        }}
      />
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-t, gray.950 0%, transparent 40%)"
        opacity={0.6}
      />
    </Box>
  );
}

export default MovieImage;
