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
  const topRatedList = useSelector(topList);
  const isLoading = useSelector(topLoading);
  const currentPageNumber = useSelector(currentPage);

  useEffect(() => {
    dispatch(getTopMovies(currentPageNumber));
  }, [dispatch, currentPageNumber]);

  const handleLoadMore = () => {
    dispatch(setCurrentPage(currentPageNumber + 1));
  };

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch, location.pathname]);

  return (
    <VStack
      divider={<StackDivider borderColor="blue.800" />}
      spacing={4}
      p={[2, 4, 6, 8]}>
      <Box w="100%">
        <Title text="En İyi Derecelendirilmiş Filmler">
          <p>En iyi derecelendirilmiş filmlerin listesi</p>
        </Title>
      </Box>
      {isLoading && currentPageNumber === 1 ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <>
          <SimpleGrid
            justifyItems="center"
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={4}>
            {topRatedList.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </SimpleGrid>
          <Box mt={4} w="100%" display="flex" justifyContent="center">
            <Button
              onClick={handleLoadMore}
              colorScheme="blue"
              disabled={isLoading}>
              Daha Fazla Yükle
            </Button>
          </Box>
        </>
      )}
    </VStack>
  );
};

export default TopRatedMovies;
