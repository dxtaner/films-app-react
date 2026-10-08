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

  const upcomingMovies = useSelector(upcomingList) || [];
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
      spacing={6}
      p={[2, 4, 6, 8]}
      align="stretch"
      bg="gray.50"
      borderRadius="xl"
      boxShadow="lg"
      mt={4}
    >
      <Box textAlign="center">
        <Title text="Yaklaşan ve Vizyondaki Filmler">
          <Text color="gray.600" fontSize="md">
            Yaklaşan ve Vizyondaki tüm Filmlerin listesi
          </Text>
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
            {upcomingMovies.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </SimpleGrid>
          {currentPageNumber < totalPageCount && (
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
          )}
        </>
      )}
    </VStack>
  );
};

export default UpcomingMovies;
