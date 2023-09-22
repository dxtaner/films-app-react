import React, { useState, useEffect } from "react";
import genreOptions from "../genreOptions";
import { Button, Box } from "@chakra-ui/react";

const GenreFilter = ({ queryParams, onFilterChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    if (queryParams.with_genres) {
      setSelectedGenres(queryParams.with_genres.split(",").map(Number));
    }
  }, [queryParams]);

  const handleGenreClick = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const applyGenreFilters = () => {
    onFilterChange("with_genres", selectedGenres.join(","));
  };

  return (
    <Box>
      {genreOptions.map((genre) => (
        <Button
          key={genre.id}
          onClick={() => handleGenreClick(genre.id)}
          colorScheme={selectedGenres.includes(genre.id) ? "blue" : "gray"}
          size="xs"
          isFullWidth
          m={1}>
          {genre.name}
        </Button>
      ))}
      <Button
        onClick={applyGenreFilters}
        colorScheme="blue"
        variant="outline"
        size="sm"
        isFullWidth>
        Türleri Uygula
      </Button>
    </Box>
  );
};

export default GenreFilter;
