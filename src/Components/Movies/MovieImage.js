import React from "react";
import { Box, Image, AspectRatio, Text } from "@chakra-ui/react";

const MovieImage = ({ imageUrl, altText }) => {
  const defaultImage =
    "https://via.placeholder.com/800x450?text=Gorsel+Bulunamadi";
  const isImageAvailable = imageUrl && imageUrl.trim() !== "";
  const displayImage = isImageAvailable ? imageUrl : defaultImage;

  return (
    <Box
      w="100%"
      mx="auto"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <AspectRatio ratio={16 / 9}>
        <Image
          src={displayImage}
          alt={altText || "Film Afişi"}
          objectFit="cover"
          objectPosition="center"
        />
      </AspectRatio>
      {!isImageAvailable && (
        <Text mt={2} textAlign="center" color="gray.500" fontSize="md">
          Görsel mevcut değil
        </Text>
      )}
    </Box>
  );
};

export default MovieImage;
