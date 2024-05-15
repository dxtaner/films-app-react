import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopMovies, topList } from "../../app/features/movies/topSlice";
import { SimpleGrid, StackDivider, VStack } from "@chakra-ui/react";
import MovieCard from "../Cards/MovieCards";

const TopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedList = useSelector(topList);

  useEffect(() => {
    dispatch(getTopMovies());
  }, [dispatch]);

  return (
    <VStack
      divider={<StackDivider borderColor="blue.800" />}
      spacing={4}
      p={[2, 4, 6, 8]}>
      <SimpleGrid
        justifyItems="center"
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        spacing={4}>
        {topRatedList.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default TopRatedMovies;
