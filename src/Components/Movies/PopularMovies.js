import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Grid } from "@chakra-ui/react";
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

  if (!popularMovies) {
    console.error("popularMovies eksik.");
    return null;
  }
  if (!popularMovies.results) {
    console.error("results eksik.");
    return null;
  }

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
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
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
