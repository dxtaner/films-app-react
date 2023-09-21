import React, { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { searchMoviesAsync } from "../../../app/features/movies/searchSlice.js";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (location.state && location.state.id) {
      dispatch(searchMoviesAsync(location.state.id));
    }
  }, [dispatch, location]);

  useEffect(() => {
    setQuery("");
  }, [location.key]);

  const handleSearch = () => {
    dispatch(searchMoviesAsync(query));
    navigate(`/searchMovies?query=${query}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <Input
        placeholder="Film Arayın.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
