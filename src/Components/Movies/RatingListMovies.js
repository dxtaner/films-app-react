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
  const ratedMovies = useSelector(selectRatedMovies);
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
      divider={<StackDivider borderColor="blue.800" />}
      justifyContent="center"
      bg="gray.50"
      p={[2, 4, 6, 8]}
      spacing={4}>
      <Box>
        <Title text="Derecelendirilen Filmler" />
        <Text fontSize="lg">Bunlar, derecelendirdiğiniz filmlerdir.</Text>
      </Box>
      {loading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={6}>
          {ratedMovies.length > 0 ? (
            ratedMovies.map((item) => <MovieCard key={item.id} movie={item} />)
          ) : (
            <Center>
              <Text fontSize="lg">Derecelendirilmiş film bulunamadı.</Text>
            </Center>
          )}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default RatingListMovies;
