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
        <Title text="İzleme Listem">
          <Text fontSize="sm" color="gray.400" mt={1}>
            İzleme listenize eklediğiniz filmler.
          </Text>
        </Title>
      </Box>

      {isLoading ? (
        <Center py={20}>
          <Spinner size="xl" color="teal.500" thickness="4px" />
        </Center>
      ) : (
        <Box w="100%">
          {watchList.length > 0 ? (
            <SimpleGrid
              mt="4"
              columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
              spacing={6}
            >
              {watchList.map((item) => (
                <MovieCard key={item.id} movie={item} />
              ))}
            </SimpleGrid>
          ) : (
            <Center py={20}>
              <Text fontSize="lg" color="gray.400">
                İzleme listeniz boş.
              </Text>
            </Center>
          )}
        </Box>
      )}
    </VStack>
  );
};

export default WatchListMovies;
