import React, { useState, useEffect } from "react";
import {
  Input,
  Box,
  IconButton,
  InputGroup,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { searchMoviesAsync } from "../../../app/features/movies/searchSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const searchResults = useSelector((state) => state.search.results);

  useEffect(() => {
    if (location.state && location.state.id) {
      dispatch(searchMoviesAsync(location.state.id));
    }
  }, [dispatch, location]);

  useEffect(() => {
    setQuery("");
  }, [location.key]);

  useEffect(() => {
    if (query.trim() !== "") {
      dispatch(searchMoviesAsync(query));
    }
  }, [dispatch, query]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      navigate(`/SearchMovies?query=${query}`);
    }
  };

  const handleResultClick = (result) => {
    // console.log("Selected Movie:", result);
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      dispatch(searchMoviesAsync(query));
    }
  };

  return (
    <Flex justifyContent="center" mt={6} mb={6} width="full">
      <Box
        position="relative"
        width={{ base: "full", md: "800px" }}
        bg="white"
        borderRadius="xl"
        boxShadow="md"
        p={4}>
        <InputGroup>
          <Input
            placeholder="Film Arayın.."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            borderRadius="xl"
            borderColor="blue.300"
            _hover={{ borderColor: "blue.500" }}
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
          />
          <InputRightElement>
            <IconButton
              aria-label="Search Movies"
              icon={<SearchIcon />}
              onClick={handleSearch}
              colorScheme="blue"
              borderRadius="xl"
            />
          </InputRightElement>
        </InputGroup>
        {query && (
          <Box position="absolute" top="60px" width="full" zIndex={10}>
            <SearchResults
              results={searchResults}
              handleResultClick={handleResultClick}
            />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default SearchBar;
