import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SimpleGrid,
  VStack,
  Text,
  StackDivider,
  Box,
  Center,
  Spinner,
  Button,
} from "@chakra-ui/react";
import MovieCard from "../Cards/MovieCards";
import Title from "../Title/titles";
import {
  getUpcoming,
  upcomingList,
  upcomingLoading,
  currentPage,
  totalPages,
  setCurrentPage,
} from "../../app/features/movies/upcomingSlice";
import { useLocation } from "react-router-dom";

const UpcomingMovies = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const upcomingMovies = useSelector(upcomingList);
  const isLoading = useSelector(upcomingLoading);
  const currentPageNumber = useSelector(currentPage);
  const totalPageCount = useSelector(totalPages);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch, location.pathname]);

  useEffect(() => {
    dispatch(getUpcoming(currentPageNumber));
  }, [dispatch, currentPageNumber]);

  const handleLoadMore = () => {
    dispatch(setCurrentPage(currentPageNumber + 1));
  };

  return (
    <VStack
      divider={<StackDivider borderColor="blue.800" />}
      spacing={4}
      p={[2, 4, 6, 8]}>
      <Box>
        <Title text="Yaklaşan ve Vizyondaki Filmler">
          <Text>Yaklaşan ve Vizyondaki tüm Filmlerin listesi</Text>
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
            {upcomingMovies.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </SimpleGrid>
          {currentPageNumber < totalPageCount && (
            <Box mt={4} w="100%" display="flex" justifyContent="center">
              <Button
                onClick={handleLoadMore}
                colorScheme="blue"
                disabled={isLoading}>
                Daha Fazla Yükle
              </Button>
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

export default UpcomingMovies;
