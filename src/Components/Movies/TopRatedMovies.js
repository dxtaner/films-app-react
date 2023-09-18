import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopMovies, topList } from "../../app/features/movies/topSlice.js";

import { Grid, Spinner } from "@chakra-ui/react";
import MovieCard from "../Cards/MovieCards.js";

const TopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedList = useSelector(topList);

  useEffect(() => {
    dispatch(getTopMovies());
  }, [dispatch]);

  return (
    <div>
      <Suspense fallback={<Spinner size="lg" />}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)", // Taşma sorununu önlemek için sütun sayısını düzenledik
            xl: "repeat(5, 1fr)", // Taşma sorununu önlemek için sütun sayısını düzenledik
          }}
          gap={3}
          justifyContent="center">
          {topRatedList.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </Grid>
      </Suspense>
    </div>
  );
};

export default TopRatedMovies;
