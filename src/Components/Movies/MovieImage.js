import React from "react";
import { Box, Image } from "@chakra-ui/react";

const MovieImage = ({ imageUrl, altText }) => {
  return (
    <Box
      cursor="pointer"
      w="100%"
      maxW="880px"
      minW={"auto"}
      mx="auto"
      m={2}
      borderRadius="lg"
      overflow="hidden"
      transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "lg",
      }}
      borderWidth="1px"
      borderColor="gray.200">
      <Image
        src={imageUrl}
        alt={altText}
        w="100%"
        h="auto"
        objectFit="cover"
        objectPosition="center top"
      />
    </Box>
  );
};

export default MovieImage;
