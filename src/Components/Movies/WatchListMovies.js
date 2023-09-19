import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import MovieCard from "../Cards/MovieCards.js";
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
} from "../../app/features/movies/watchListSlice.js"; // İzleme listesi slice'ını eklemeyi unutmayın
import Title from "../Title/titles.js";

const WatchListMovies = () => {
  const dispatch = useDispatch();
  const watchList = useSelector(watchListMovies); // Watch List slice'ından verileri alın
  const isLoading = useSelector(watchListLoading); // Watch List yükleniyor mu kontrolü
  const token = sessionStorage.getItem("session_id");

  useEffect(() => {
    if (token) {
      dispatch(getWatchList()); // İzleme listesi verilerini almak için gerekli action'u çağırın
    }
  }, [dispatch, token]);

  return (
    <VStack
      divider={<StackDivider borderColor="blue.800" />}
      justifyContent="center"
      p={[2, 4, 6, 8]}
      spacing={4}>
      {!token && <Navigate replace to="/auth/login" />}
      <Box>
        <Title text="İzleme Listem">
          Buradaki filmlerin tümü izleme listesine eklediğiniz filmlerdir.
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
          {watchList.length > 0 ? (
            watchList.map((item) => <MovieCard key={item.id} movie={item} />)
          ) : (
            <Text>İzleme listeniz boş</Text>
          )}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default WatchListMovies;
