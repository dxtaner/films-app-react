import React from "react";
import { HStack, Tag, Tooltip } from "@chakra-ui/react";

const MovieGenres = ({ genres = [] }) => {
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

  return (
    <HStack wrap="wrap" spacing={2} my={2} justifyContent="center">
      {genres.map((genre, index) => {
        const color = colors[index % colors.length];
        return (
          <Tooltip key={genre.id || index} label={genre.name} hasArrow>
            <Tag
              colorScheme={color}
              variant="solid"
              borderRadius="full"
              px={3}
              py={1.5}
              fontSize="sm"
              fontWeight="bold"
            >
              {genre.name}
            </Tag>
          </Tooltip>
        );
      })}
    </HStack>
  );
};

export default MovieGenres;
