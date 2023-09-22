import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDiscoverMovies,
  setPage,
} from "./../../app/features/movies/discoverMoviesSlice.js";
import { Stack, Text, Box, Flex, Divider } from "@chakra-ui/react";
import MoviesList from "./MoviesList"; // Ekledik
import FilterOptions from "./FilterOptions"; // Ekledik
import LoadMoreButton from "./LoadMoreButton"; // Ekledik

const DiscoverMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.discoverMovies.movies);
  const status = useSelector((state) => state.discoverMovies.status);
  let page = useSelector((state) => state.discoverMovies.page);
  const error = useSelector((state) => state.discoverMovies.error);

  const [queryParams, setQueryParams] = useState({
    certification: "PG-13",
    include_adult: false,
    include_video: false,
    sort_by: "popularity.desc",
    page: page,
    language: "tr-US",
    primary_release_year: undefined,
    primary_release_date: {
      gte: undefined,
      lte: undefined,
    },
    region: undefined,
    "vote_average.gte": undefined,
    "vote_average.lte": undefined,
    "vote_count.gte": undefined,
    "vote_count.lte": undefined,
    with_cast: undefined,
    with_genres: "",
    "with_runtime.gte": undefined,
    "with_runtime.lte": undefined,
    without_genres: undefined,
    year: undefined,
    with_origin_country: undefined,
    with_original_language: undefined,
  });

  console.log("queryParams", queryParams);
  useEffect(() => {
    dispatch(fetchDiscoverMovies({ ...queryParams, page: page }));
  }, [dispatch, queryParams, page]);

  const handleFilterChange = (filterName, filterValue) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      [filterName]: filterValue,
    }));
  };

  const handleLoadMore = () => {
    page += 1;
    dispatch(setPage(page));
    dispatch(fetchDiscoverMovies({ ...queryParams, page }));
  };

  return (
    <Box p={4}>
      <Flex>
        <Box flex="1" p={4} style={{ boxSizing: "border-box", width: "100%" }}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Filmleri Keşfet
          </Text>
          <Stack direction="column" spacing={4}>
            <FilterOptions
              queryParams={queryParams}
              onFilterChange={handleFilterChange}
            />
            <Divider />
          </Stack>
        </Box>

        <Box flex="4">
          <MoviesList movies={movies} status={status} error={error} />
          <Flex justifyContent="center" alignItems={"center"} mt={6}>
            <LoadMoreButton
              onClick={handleLoadMore}
              status={status}
              colorScheme="teal">
              Daha Fazla Yükle
            </LoadMoreButton>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default DiscoverMovies;
