import React, { useState, useEffect } from "react";
import { Button, Box, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import genreOptions from "../genreOptions";

const GenreFilter = ({ queryParams, onFilterChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    onFilterChange({
      with_genres: selectedGenres.join(","),
    });
  }, [selectedGenres, onFilterChange, queryParams]);

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
      borderWidth={1}
      borderRadius="lg"
      boxShadow="sm"
      bg="gray.50"
      borderColor="gray.200"
      _hover={{ boxShadow: "md", borderColor: "gray.300" }}>
      <Flex wrap="wrap" justifyContent="center" alignItems="center">
        <Wrap spacing={2} justify="center">
          {genreOptions.map((genre) => (
            <WrapItem key={genre.id}>
              <Button
                onClick={() => handleGenreClick(genre.id)}
                colorScheme={
                  selectedGenres.includes(genre.id) ? "teal" : "gray"
                }
                size="sm"
                m={1}
                borderRadius="md"
                _hover={{
                  bg: selectedGenres.includes(genre.id)
                    ? "teal.500"
                    : "gray.300",
                }}
                _focus={{ outline: "none" }}>
                {genre.name}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    </Box>
  );
};

export default GenreFilter;
