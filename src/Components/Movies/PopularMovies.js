// PopularMovies.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Grid, Text } from "@chakra-ui/react";
import {
  popularList,
  getPopular,
} from "../../app/features/movies/popularSlice.js";
import MovieCard from "../Cards/MovieCards.js";

const PopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(popularList);
  const [page, setPage] = useState(1);
  const moviesPerPage = 4;
  const [displayedMovies, setDisplayedMovies] = useState([]);

  useEffect(() => {
    dispatch(getPopular());
  }, [dispatch]);

  useEffect(() => {
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    setDisplayedMovies(popularMovies.results.slice(startIndex, endIndex));
  }, [popularMovies, page]);

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(popularMovies.results.length / moviesPerPage);
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>
        Popüler Filmler
      </Text>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
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
          disabled={
            page === Math.ceil(popularMovies.results.length / moviesPerPage)
          }
          colorScheme="teal">
          İleri
        </Button>
      </Box>
    </Box>
  );
};

export default PopularMovies;
