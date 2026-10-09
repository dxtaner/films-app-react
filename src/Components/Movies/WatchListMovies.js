import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import MovieCard from "../Cards/MovieCards";
import {
  Box,
  VStack,
  SimpleGrid,
  StackDivider,
  Text,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWatchList,
  watchListMovies,
  watchListLoading,
} from "../../app/features/movies/watchListSlice";
import Title from "../Title/titles";

const WatchListMovies = () => {
  const dispatch = useDispatch();
  const watchList = useSelector(watchListMovies) || [];
  const isLoading = useSelector(watchListLoading);
  const token = sessionStorage.getItem("session_id");

  useEffect(() => {
    if (token) {
      dispatch(getWatchList());
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
      spacing={6}
      align="stretch"
      borderRadius="xl"
      boxShadow="lg"
      mt={4}
    >
      <Box textAlign="center">
        <Title text="İzleme Listem">
          <Text fontSize="lg" color="gray.600">
            Buradaki filmler, izleme listenize eklediğiniz filmlerdir.
          </Text>
        </Title>
      </Box>

      {isLoading ? (
        <Center py={10}>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : (
        <SimpleGrid
          mt="4"
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={6}
          justifyContent="center"
        >
          {watchList.length > 0 ? (
            watchList.map((item) => <MovieCard key={item.id} movie={item} />)
          ) : (
            <Center gridColumn="1 / -1" py={12}>
              <Text fontSize="lg" color="gray.500">
                İzleme listeniz boş.
              </Text>
            </Center>
          )}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default WatchListMovies;
