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
      divider={<StackDivider borderColor="blue.800" />}
      justifyContent="center"
      bg="gray.50"
      p={[2, 4, 6, 8]}
      spacing={4}>
      <Box>
        <Title text="Favori Filmlerim">
          <Text fontSize="lg">
            Buradaki filmler, hesabınızla ilişkilendirilmiş favori
            filmlerinizdir.
          </Text>
        </Title>
      </Box>
      {isLoading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <SimpleGrid
          mt="4"
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={4}>
          {favorites.length > 0 ? (
            favorites.map((item) => <MovieCard key={item.id} movie={item} />)
          ) : (
            <Center>
              <Text>Favori filminiz bulunmamaktadır.</Text>
            </Center>
          )}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default Favorites;
