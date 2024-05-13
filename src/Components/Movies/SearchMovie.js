import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchResults,
  searchMoviesAsync,
} from "../../app/features/movies/searchSlice.js";
import {
  SimpleGrid,
  Text,
  Box,
  Button,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import MovieCard from "../Cards/MovieCards.js";
import Title from "../Title/titles.js";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const RESULTS_PER_PAGE = 10;

const SearchMovie = () => {
  const dispatch = useDispatch();
  const searchMovies = useSelector(selectSearchResults);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    const page =
      parseInt(new URLSearchParams(location.search).get("page")) || 1;
    setCurrentPage(page);
    if (query) {
      dispatch(searchMoviesAsync(query, page));
    }
  }, [dispatch, location]);

  const totalResults = searchMovies.length;
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const query = new URLSearchParams(location.search).get("query");
      navigate(`/searchMovies?query=${query}&page=${page}`);
    }
  };

  const displayedResults = searchMovies.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  return (
    <Box mt={8} textAlign="center">
      <Title>{`En İyi ${totalResults} Arama Sonucu`}</Title>
      {totalResults === 0 ? (
        <Text mt={4} fontSize="lg">
          Sonuç Bulunamadı
        </Text>
      ) : (
        <>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={4}
            justifyContent="center">
            {displayedResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </SimpleGrid>

          <Flex justifyContent="center" mt={4}>
            <IconButton
              icon={<ChevronLeftIcon />}
              size="sm"
              m={1}
              colorScheme="blue"
              variant="outline"
              aria-label="Previous Page"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              mr={2}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                size="sm"
                m={1}
                colorScheme="blue"
                variant={currentPage === index + 1 ? "solid" : "outline"}
                onClick={() => handlePageChange(index + 1)}
                mx={1}>
                {index + 1}
              </Button>
            ))}
            <IconButton
              icon={<ChevronRightIcon />}
              size="sm"
              m={1}
              colorScheme="blue"
              variant="outline"
              aria-label="Next Page"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              ml={2}
            />
          </Flex>
        </>
      )}
    </Box>
  );
};

export default SearchMovie;
