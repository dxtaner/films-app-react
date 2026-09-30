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
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const searchResults = useSelector((state) => state.search.results);

  // Debouncing: Kullanıcı yazmayı bıraktıktan 400ms sonra Redux isteği atılır
  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const timer = setTimeout(() => {
      dispatch(searchMoviesAsync(trimmedQuery));
    }, 400);

    return () => clearTimeout(timer);
  }, [query, dispatch]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/SearchMovies?query=${encodeURIComponent(query)}`);
    }
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      navigate(`/SearchMovies?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Flex justifyContent="center" my={6} width="full" px={4}>
      <Box
        position="relative"
        width={{ base: "full", md: "700px" }}
        bg="gray.800"
        borderRadius="full"
        boxShadow="xl"
        p={1}
      >
        <InputGroup size="lg">
          <Input
            placeholder="Film veya dizi arayın..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            borderRadius="full"
            bg="transparent"
            border="none"
            color="white"
            _placeholder={{ color: "gray.400" }}
            _focus={{ boxShadow: "none" }}
            px={6}
          />
          <InputRightElement pr={2} h="100%" display="flex" alignItems="center">
            <IconButton
              aria-label="Search Movies"
              icon={<SearchIcon />}
              onClick={handleSearchSubmit}
              colorScheme="red"
              borderRadius="full"
              size="sm"
            />
          </InputRightElement>
        </InputGroup>

        {query.trim() && (
          <Box
            position="absolute"
            top="100%"
            left={0}
            right={0}
            mt={2}
            zIndex={150}
          >
            <SearchResults
              results={searchResults}
              handleResultClick={() => setQuery("")}
            />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default SearchBar;
