import React from "react";
import { Text, Center, Grid } from "@chakra-ui/react";
import MovieCard from "../Cards/MovieCards.js";

const MoviesList = ({ movies, status, error }) => {
  if (status === "failed") {
    return (
      <Center mt={6}>
        <Text color="red.500" fontSize="lg" fontWeight="bold">
          Hata: {error}
        </Text>
      </Center>
    );
  }

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(5, 1fr)",
      }}
      gap={6}
      mt={6}
      px={4}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Grid>
  );
};

export default MoviesList;
