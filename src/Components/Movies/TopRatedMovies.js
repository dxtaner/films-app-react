import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  VStack,
  SimpleGrid,
  StackDivider,
  Box,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import MovieCard from "../Cards/MovieCards";
import Title from "../Title/titles";
import {
  getTopMovies,
  topList,
  topLoading,
  currentPage,
  setCurrentPage,
} from "../../app/features/movies/topSlice";
import { useLocation } from "react-router-dom";

const TopRatedMovies = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const topRatedList = useSelector(topList) || [];
  const isLoading = useSelector(topLoading);
  const currentPageNumber = useSelector(currentPage);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch, location.pathname]);

  useEffect(() => {
    dispatch(getTopMovies(currentPageNumber));
  }, [dispatch, currentPageNumber]);

  const handleLoadMore = () => {
    dispatch(setCurrentPage(currentPageNumber + 1));
  };

  return (
    <VStack
      divider={<StackDivider borderColor="blue.800" />}
      spacing={6}
      p={[2, 4, 6, 8]}
      align="stretch"
      bg="gray.50"
      borderRadius="xl"
      boxShadow="lg"
      mt={4}
    >
      <Box w="100%" textAlign="center">
        <Title text="En İyi Derecelendirilmiş Filmler">
          <Box as="p" color="gray.600" fontSize="md">
            En iyi derecelendirilmiş filmlerin listesi
          </Box>
        </Title>
      </Box>
      {isLoading && currentPageNumber === 1 ? (
        <Center py={10}>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : (
        <>
          <SimpleGrid
            justifyItems="center"
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={6}
          >
            {topRatedList.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </SimpleGrid>
          <Box mt={6} w="100%" display="flex" justifyContent="center">
            <Button
              onClick={handleLoadMore}
              colorScheme="blue"
              size="lg"
              isDisabled={isLoading}
              boxShadow="md"
            >
              {isLoading ? <Spinner size="sm" /> : "Daha Fazla Yükle"}
            </Button>
          </Box>
        </>
      )}
    </VStack>
  );
};

export default TopRatedMovies;
