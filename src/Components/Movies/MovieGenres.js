import React from "react";
import { HStack, Tag, Tooltip } from "@chakra-ui/react";

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
    <HStack wrap={"wrap"} spacing={2} mt={1} mb={1} justifyContent="center">
      {genres?.map((genre, index) => {
        const color = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;

        return (
          <Tooltip key={index} label={genre.name} hasArrow>
            <Tag
              colorScheme={color}
              variant="solid"
              borderRadius="full"
              px={[2, 3, 4]}
              py={[1, 2]}
              fontSize={["xxs", "xs", "sm", "md"]}
              fontWeight="900"
              _hover={{ bg: `${color}.700` }}>
              {genre.name}
            </Tag>
          </Tooltip>
        );
      })}
    </HStack>
  );
};

export default MovieGenres;
