import React, { useState } from "react";
import {
  Button,
  Box,
  Flex,
  Wrap,
  WrapItem,
  Text,
  Divider,
} from "@chakra-ui/react";
import genreOptions from "../genreOptions";

const GenreFilter = ({ queryParams, onFilterChange }) => {
  const [selectedGenres, setSelectedGenres] = useState(
    queryParams?.with_genres
      ? queryParams.with_genres.split(",").map(Number)
      : [],
  );

  const handleGenreClick = (genreId) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];

    setSelectedGenres(updatedGenres);
    onFilterChange("with_genres", updatedGenres.join(","));
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="xl"
      bg="gray.900"
      borderColor="gray.800"
      boxShadow="lg"
      _hover={{ borderColor: "gray.700" }}
    >
      <Text fontWeight="bold" mb={1} color="gray.200" fontSize="sm">
        Film Türleri
      </Text>
      <Divider my={2} borderColor="gray.800" />
      <Flex wrap="wrap" justifyContent="center" alignItems="center">
        <Wrap spacing={2} justify="start">
          {genreOptions.map((genre) => {
            const isSelected = selectedGenres.includes(genre.id);
            return (
              <WrapItem key={genre.id}>
                <Button
                  onClick={() => handleGenreClick(genre.id)}
                  bg={isSelected ? "red.600" : "gray.800"}
                  color={isSelected ? "white" : "gray.300"}
                  size="xs"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={isSelected ? "red.500" : "gray.700"}
                  _hover={{
                    bg: isSelected ? "red.700" : "gray.700",
                    color: "white",
                  }}
                  _active={{ bg: "red.800" }}
                >
                  {genre.name}
                </Button>
              </WrapItem>
            );
          })}
        </Wrap>
      </Flex>
    </Box>
  );
};

export default GenreFilter;
