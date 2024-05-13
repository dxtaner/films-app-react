import React, { useState, useEffect } from "react";
import { Input, Box } from "@chakra-ui/react";
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
  }, [dispatch, navigate, query]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleResultClick = (result) => {
    console.log("Selected Movie:", result);
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      dispatch(searchMoviesAsync(query));
      navigate(`/searchMovies?query=${query}`);
    }
  };

  return (
    <Box display="flex" justifyContent="center" margin="20px">
      <Box
        position="relative"
        width="1000px"
        bg="white"
        borderRadius="xl"
        boxShadow="md"
        p="4">
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
        {query && (
          <SearchResults
            results={searchResults}
            handleResultClick={handleResultClick}
          />
        )}
      </Box>
    </Box>
  );
};

export default SearchBar;
