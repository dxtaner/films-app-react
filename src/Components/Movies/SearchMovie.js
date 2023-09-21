import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchResults,
  searchMoviesAsync,
} from "../../app/features/movies/searchSlice.js";
import { SimpleGrid, Text, Box } from "@chakra-ui/react";
import MovieCard from "../Cards/MovieCards.js";
import Title from "../Title/titles.js";

const SearchMovie = () => {
  const dispatch = useDispatch();
  const searchMovies = useSelector(selectSearchResults);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      dispatch(searchMoviesAsync(query));
    }
  }, [dispatch, location]);

  return (
    <Box mt={8}>
      <Title>Arama Sonuçları</Title>
      {searchMovies.length === 0 ? (
        <Text align="center">Sonuç Bulunamadı</Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={4}>
          {searchMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default SearchMovie;
