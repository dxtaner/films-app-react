import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import MovieCard from "../Cards/Cards.js";
import { Box, VStack, SimpleGrid, StackDivider, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavorites,
  favoritesList,
} from "../../app/features/movies/favoritesSlice.js";
import Title from "../Title/titles.js";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(favoritesList);
  const token = sessionStorage.getItem("session_id");

  useEffect(() => {
    if (token) {
      dispatch(getFavorites());
    }
  }, [dispatch, token]);

  return (
    <VStack
      divider={<StackDivider borderColor="blue.800" />}
      justifyContent="center"
      p={[2, 4, 6, 8]}>
      {!token && <Navigate replace to="/auth/login" />}
      <Box>
        <Title text="Favori Filmlerim">
          Buradaki filmlerin tümü hesabınızla ilişkili favori filmlerinizdir.
        </Title>
      </Box>
      <SimpleGrid
        mt="4"
        columns={{ base: 1, sm: 2, md: 3, lg: 5, xl: 6 }}
        spacing={2}>
        {favorites.length > 0 ? (
          favorites.map((items, index) => (
            <MovieCard key={index} movie={items} />
          ))
        ) : (
          <Text>Favori filminiz yok</Text>
        )}
      </SimpleGrid>
    </VStack>
  );
};

export default Favorites;
