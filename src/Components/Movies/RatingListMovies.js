import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MovieCard from "../Cards/MovieCards";
import {
  Box,
  VStack,
  SimpleGrid,
  Text,
  Center,
  Spinner,
  StackDivider,
} from "@chakra-ui/react";
import {
  selectRatedMovies,
  fetchRatedMovies,
  ratedMoviesLoading,
} from "../../app/features/movies/ratedMovieSlice";
import Title from "../Title/titles";

const RatingListMovies = () => {
  const dispatch = useDispatch();
  const ratedMovies = useSelector(selectRatedMovies) || [];
  const loading = useSelector(ratedMoviesLoading);
  const token = sessionStorage.getItem("session_id");

  useEffect(() => {
    if (token) {
      dispatch(fetchRatedMovies());
    }
  }, [dispatch, token]);

  if (!token) {
    return <Navigate replace to="/auth/login" />;
  }

  return (
    <VStack
      divider={<StackDivider borderColor="gray.800" />}
      justifyContent="center"
      bg="gray.950"
      p={[4, 6, 8]}
      spacing={6}
      borderRadius="xl"
      minH="80vh"
      maxW="1400px"
      mx="auto"
      align="stretch"
    >
      <Box w="100%">
        <Title text="Derecelendirilen Filmler">
          <Text fontSize="sm" color="gray.400" mt={1}>
            Puan verdiğiniz filmler.
          </Text>
        </Title>
      </Box>

      {loading ? (
        <Center py={20}>
          <Spinner size="xl" color="yellow.500" thickness="4px" />
        </Center>
      ) : (
        <Box w="100%">
          {ratedMovies.length > 0 ? (
            <SimpleGrid
              mt="4"
              columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
              spacing={6}
            >
              {ratedMovies.map((item) => (
                <MovieCard key={item.id} movie={item} />
              ))}
            </SimpleGrid>
          ) : (
            <Center py={20}>
              <Text fontSize="lg" color="gray.400">
                Derecelendirilmiş film bulunamadı.
              </Text>
            </Center>
          )}
        </Box>
      )}
    </VStack>
  );
};

export default RatingListMovies;
