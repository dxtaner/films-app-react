import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@chakra-ui/react";
import MovieCard from "../Cards/MovieCards";

const PopularMovies = ({ popularMovies }) => {
  const [page, setPage] = useState(1);
  const moviesPerPage = 5;
  const [displayedMovies, setDisplayedMovies] = useState([]);

  useEffect(() => {
    if (popularMovies && popularMovies.results) {
      const startIndex = (page - 1) * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;

      if (popularMovies.results.length >= endIndex) {
        setDisplayedMovies(popularMovies.results.slice(startIndex, endIndex));
      } else {
        setPage(Math.ceil(popularMovies.results.length / moviesPerPage));
      }
    }
  }, [popularMovies, page]);

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const totalPages =
    popularMovies && popularMovies.results
      ? Math.ceil(popularMovies.results.length / moviesPerPage)
      : 0;

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <Box>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={4}>
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
      <Box mt={4}>
        <Button
          onClick={goToPreviousPage}
          disabled={page === 1}
          colorScheme="teal"
          mr={2}>
          Geri
        </Button>
        <Button
          onClick={goToNextPage}
          disabled={page === totalPages}
          colorScheme="teal">
          İleri
        </Button>
      </Box>
    </Box>
  );
};

export default PopularMovies;
