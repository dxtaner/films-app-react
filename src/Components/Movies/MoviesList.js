import React from "react";
import { Flex, Text, Spinner, Center, Box } from "@chakra-ui/react";
import MovieCard from "../Cards/MovieCards.js";

const MoviesList = ({ movies, status, error }) => {
  if (status === "loading") {
    return (
      <Center mt={6}>
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  if (status === "failed") {
    return (
      <Text mt={6} color="red.500" fontSize="lg" fontWeight="bold">
        Hata: {error}
      </Text>
    );
  }

  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" mt={6}>
      {movies.map((movie) => (
        <Box key={movie.id} m={2}>
          <MovieCard movie={movie} />
        </Box>
      ))}
    </Flex>
  );
};

export default MoviesList;
