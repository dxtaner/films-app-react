import React from "react";
import { HStack, Tag } from "@chakra-ui/react";

const MovieGenres = ({ genres }) => {
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "purple",
    "pink",
    "gray",
  ];

  let colorIndex = 0;

  return (
    <HStack wrap={"wrap"} spacing={2} mt={4} mb={2} justifyContent="center">
      {genres?.map((genre, index) => {
        const color = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;

        return (
          <Tag
            key={index}
            colorScheme={color}
            variant="solid"
            borderRadius="full"
            px={3}
            py={2}
            fontSize="md"
            fontWeight="900"
            _hover={{ bg: `${color}.700` }}>
            {genre.name}
          </Tag>
        );
      })}
    </HStack>
  );
};

export default MovieGenres;
