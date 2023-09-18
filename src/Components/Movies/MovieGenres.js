import React from "react";
import { HStack, Tag } from "@chakra-ui/react";

const MovieGenres = ({ genres }) => {
  return (
    <HStack spacing={2} mt={4} mb={2} justifyContent="center">
      {genres?.map((gen, index) => (
        <Tag
          key={index}
          colorScheme="red"
          bg="gray.300"
          borderRadius="lg"
          p={2}
          fontSize="sm"
          fontWeight="bold">
          {gen.name}
        </Tag>
      ))}
    </HStack>
  );
};

export default MovieGenres;
