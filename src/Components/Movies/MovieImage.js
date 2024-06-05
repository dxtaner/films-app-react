import React from "react";
import { Box, Image, AspectRatio, Text } from "@chakra-ui/react";

const MovieImage = ({ imageUrl, altText }) => {
  const defaultImage =
    "https://via.placeholder.com/800x450?text=No+Image+Available";
  const isImageAvailable = imageUrl && imageUrl.trim() !== "";
  const displayImage = isImageAvailable ? imageUrl : defaultImage;
  const displayAltText = isImageAvailable ? altText : "Image not available";

  return (
    <Box
      cursor="pointer"
      w="100%"
      mx="auto"
      m={1}
      borderRadius="lg"
      overflow="hidden"
      transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "lg",
      }}
      borderWidth="2px"
      borderColor="gray.200">
      <AspectRatio ratio={16 / 9}>
        <Image
          src={displayImage}
          alt={displayAltText}
          w="100%"
          h="auto"
          objectFit="cover"
          objectPosition="center top"
        />
      </AspectRatio>
      {!isImageAvailable && (
        <Text
          mt={2}
          textAlign="center"
          color="gray.500"
          fontSize={["sm", "md", "lg"]}>
          {altText || "Image not available"}
        </Text>
      )}
    </Box>
  );
};

export default MovieImage;
