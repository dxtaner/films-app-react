import { useEffect } from "react";
import {
  SimpleGrid,
  VStack,
  Text,
  StackDivider,
  Box,
  Center,
  Spinner,
} from "@chakra-ui/react";
import MovieCard from "../Cards/MovieCards.js";
import {
  getUpcoming,
  upcomingList,
  upcomingLoading,
} from "../../app/features/movies/upcomingSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Title from "../Title/titles.js";

const UpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector(upcomingList);
  const isLoading = useSelector(upcomingLoading);

  useEffect(() => {
    dispatch(getUpcoming());
  }, [dispatch]);

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
      {isLoading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <SimpleGrid
          justifyItems="center"
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={4}>
          {upcomingMovies.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};
export default UpcomingMovies;
