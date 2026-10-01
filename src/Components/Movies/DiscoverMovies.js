import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDiscoverMovies,
  setPage,
} from "../../app/features/movies/discoverMoviesSlice.js";
import { Box, Flex, Stack, Divider, Button } from "@chakra-ui/react";
import MoviesList from "./MoviesList";
import FilterOptions from "./FilterOptions";
import LoadMoreButton from "./LoadMoreButton";
import Title from "../Title/titles.js";

const DiscoverMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.discoverMovies.movies);
  const status = useSelector((state) => state.discoverMovies.status);
  const page = useSelector((state) => state.discoverMovies.page);
  const error = useSelector((state) => state.discoverMovies.error);

  const [queryParams, setQueryParams] = useState({
    certification: "PG-13",
    include_adult: false,
    include_video: false,
    sort_by: "popularity.desc",
    page: 1,
    language: "tr-US",
    primary_release_year: undefined,
    primary_release_date: {
      gte: undefined,
      lte: undefined,
    },
    "vote_average.gte": undefined,
    "vote_average.lte": undefined,
    "vote_count.gte": undefined,
    with_genres: "",
    "with_runtime.gte": undefined,
    "with_runtime.lte": undefined,
    without_genres: undefined,
    with_origin_country: undefined,
    with_original_language: undefined,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (filterName, filterValue) => {
    setQueryParams((prevParams) => {
      if (prevParams[filterName] === filterValue) {
        return prevParams;
      }
      return {
        ...prevParams,
        [filterName]: filterValue,
      };
    });
  };

  const handleSearch = (queryParams) => {
    dispatch(setPage(1));
    dispatch(fetchDiscoverMovies({ ...queryParams, page: 1 }));
  };

  const handleLoadMore = (queryParams) => {
    dispatch(setPage(page + 1));
    dispatch(fetchDiscoverMovies({ ...queryParams, page: page + 1 }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 200) {
        setShowSearchButton(true);
      } else {
        setShowSearchButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      p={6}
      bg="gray.900"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.800"
      boxShadow="2xl"
    >
      <Box mb={6}>
        <Title text="Filmleri Keşfet" />
        <Divider mt={3} borderColor="red.600" borderBottomWidth="2px" />
      </Box>

      <Stack spacing={6}>
        <Flex justify="space-between" align="center">
          <Button
            onClick={toggleFilter}
            colorScheme="red"
            bg="red.600"
            _hover={{ bg: "red.700" }}
            width="100%"
            height="50px"
            fontSize="md"
            borderRadius="lg"
            fontWeight="bold"
          >
            {isFilterOpen ? "Filtreyi Kapat" : "Filtrele"}
          </Button>
        </Flex>

        {isFilterOpen && (
          <Box
            p={6}
            borderRadius="xl"
            bg="gray.950"
            border="1px solid"
            borderColor="gray.800"
            boxShadow="inner"
          >
            <FilterOptions
              queryParams={queryParams}
              onFilterChange={handleFilterChange}
            />
          </Box>
        )}

        <MoviesList
          movies={movies.results || []}
          status={status}
          error={error}
        />

        {isFilterOpen && page < (movies.total_pages || 1) && (
          <Flex justify="center" mt={6}>
            <LoadMoreButton
              onClick={() => handleLoadMore(queryParams)}
              status={status}
            />
          </Flex>
        )}
      </Stack>
      {showSearchButton && isFilterOpen && (
        <Button
          onClick={() => handleSearch(queryParams)}
          colorScheme="red"
          bg="red.600"
          _hover={{ bg: "red.700" }}
          position="fixed"
          bottom="20px"
          left="50%"
          transform="translateX(-50%)"
          zIndex="100"
          borderRadius="xl"
          width="90%"
          maxW="600px"
          height="55px"
          boxShadow="0 10px 25px -5px rgba(229, 62, 62, 0.6)"
          fontWeight="bold"
          fontSize="lg"
        >
          Arama Yap
        </Button>
      )}
    </Box>
  );
};

export default DiscoverMovies;
