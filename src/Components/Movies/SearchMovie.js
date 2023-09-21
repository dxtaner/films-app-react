import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  selectSearchResults,
  searchMoviesAsync,
} from "../../app/features/movies/searchSlice.js";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../Cards/MovieCards.js";
import { SimpleGrid, Text } from "@chakra-ui/react";
import Title from "../Title/titles.js";

const SearchMovie = () => {
  const dispatch = useDispatch();
  const searchMovies = useSelector(selectSearchResults);
  const location = useLocation();

  useEffect(() => {
    dispatch(searchMoviesAsync(location.state?.id));
  }, [dispatch, location.state]);

  return (
    <div>
      <Title>Arama Sonuçları</Title>
      {searchMovies.length === 0 ? (
        <Text>Bulunamadı</Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={4}>
          {searchMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default SearchMovie;
