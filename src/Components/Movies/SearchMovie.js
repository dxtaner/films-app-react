import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchResults,
  searchMoviesAsync,
} from "../../app/features/movies/searchSlice";
import {
  SimpleGrid,
  Text,
  Box,
  Button,
  Flex,
  IconButton,
  Center,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import MovieCard from "../Cards/MovieCards";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Title from "../Title/titles";

const RESULTS_PER_PAGE = 10;

const SearchMovie = () => {
  const dispatch = useDispatch();
  const searchMovies = useSelector(selectSearchResults) || [];
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    const page = parseInt(queryParams.get("page")) || 1;
    setCurrentPage(page);
    if (query) {
      dispatch(searchMoviesAsync(query, page));
    }
  }, [dispatch, location.search]);

  const totalResults = searchMovies.length;
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE) || 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const query = new URLSearchParams(location.search).get("query");
      navigate(`/searchMovies?query=${query}&page=${page}`);
    }
  };

  const displayedResults = searchMovies.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE,
  );

  return (
    <VStack
      mt={8}
      spacing={6}
      p={6}
      alignItems="stretch"
      backgroundColor="gray.50"
      borderRadius="xl"
      boxShadow="lg"
      divider={<StackDivider borderColor="blue.800" />}
    >
      <Box textAlign="center">
        <Title text={`Arama Sonuçları (${totalResults})`} />
      </Box>

      {totalResults === 0 ? (
        <Center py={10}>
          <Text fontSize="lg" color="gray.500">
            Sonuç Bulunamadı
          </Text>
        </Center>
      ) : (
        <>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={4}
            justifyContent="center"
          >
            {displayedResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </SimpleGrid>

          <Flex justifyContent="center" mt={4} wrap="wrap" gap={1}>
            <IconButton
              icon={<ChevronLeftIcon />}
              size="sm"
              colorScheme="blue"
              variant="outline"
              aria-label="Previous Page"
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage <= 1}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                size="sm"
                colorScheme="blue"
                variant={currentPage === index + 1 ? "solid" : "outline"}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            <IconButton
              icon={<ChevronRightIcon />}
              size="sm"
              colorScheme="blue"
              variant="outline"
              aria-label="Next Page"
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage >= totalPages}
            />
          </Flex>
        </>
      )}
    </VStack>
  );
};

export default SearchMovie;
