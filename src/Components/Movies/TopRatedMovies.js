import MovieCard from "../Cards/Cards.js";
import { Suspense, useEffect } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import { getTopMovies, topList } from "../../app/features/movies/topSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { SimpleGrid, Spinner } from "@chakra-ui/react";

const TopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedList = useSelector(topList);

  useEffect(() => {
    dispatch(getTopMovies());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <SimpleGrid
        justifyItems="center"
        columns={{ base: 1, sm: 2, md: 3, lg: 5, xl: 6 }}
        spacing={3}>
        {topRatedList.map((items, index) => (
          <MovieCard key={index} movie={items} />
        ))}
      </SimpleGrid>
    </Suspense>
  );
};
export default TopRatedMovies;
