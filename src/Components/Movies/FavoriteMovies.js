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
  getFavorites,
  favoritesListMovies,
  favoritesLoading,
} from "../../app/features/movies/favoritesSlice";
import Title from "../Title/titles";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(favoritesListMovies);
  const isLoading = useSelector(favoritesLoading);
  const token = sessionStorage.getItem("session_id");

  useEffect(() => {
    if (token) {
      dispatch(getFavorites());
    }
  }, [dispatch, token]);

  if (!token) {
    return <Navigate replace to="/auth/login" />;
  }

  return (
    <VStack
      divider={<StackDivider borderColor="gray.800" />}
      justifyContent="center"
      bg="gray.900"
      p={[4, 6, 8]}
      spacing={6}
      borderRadius="xl"
      minH="80vh"
    >
      <Box w="100%">
        <Title text="Favori Filmlerim">
          <Text fontSize="sm" color="gray.400" mt={1}>
            Buradaki filmler, hesabınızla ilişkilendirilmiş favori
            filmlerinizdir.
          </Text>
        </Title>
      </Box>
      {isLoading ? (
        <Center py={10}>
          <Spinner size="xl" color="red.600" thickness="4px" />
        </Center>
      ) : (
        <Box w="100%">
          {favorites.length > 0 ? (
            <SimpleGrid
              mt="4"
              columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
              spacing={6}
            >
              {favorites.map((item) => (
                <MovieCard key={item.id} movie={item} />
              ))}
            </SimpleGrid>
          ) : (
            <Center py={16}>
              <Text color="gray.400" fontSize="lg">
                Henüz favori filminiz bulunmamaktadır.
              </Text>
            </Center>
          )}
        </Box>
      )}
    </VStack>
  );
};

export default Favorites;
