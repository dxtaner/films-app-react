import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip, IconButton, HStack, Box } from "@chakra-ui/react";
import { StarIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  addToMovieRating,
  removeFromRating,
} from "../../app/features/movies/details/detailsSlice";
import {
  fetchRatedMovies,
  selectRatedMovies,
} from "../../app/features/movies/ratedMovieSlice";

const RatingButtons = ({ movieId }) => {
  const dispatch = useDispatch();
  const ratedMovies = useSelector(selectRatedMovies);

  useEffect(() => {
    dispatch(fetchRatedMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRatedMovies());
  }, [dispatch]);

  const handleRateMovie = (rating) => {
    dispatch(addToMovieRating({ id: movieId, rating }));
  };

  const handleRemoveRating = () => {
    dispatch(removeFromRating(movieId));
  };

  const isRated = ratedMovies.find((movie) => movie.id === movieId);

  return (
    <Box textAlign="center" mt={4}>
      <HStack spacing={4} justify="center" mb={4} wrap={"wrap"}>
        {[1, 2, 3, 4, 5].map((ratingValue) => (
          <Tooltip
            key={ratingValue}
            label={`Rate ${ratingValue} stars`}
            hasArrow>
            <IconButton
              icon={
                <StarIcon
                  color={
                    isRated && ratingValue <= isRated.rating / 2
                      ? "yellow.400"
                      : "gray.400"
                  }
                  boxSize={6}
                />
              }
              variant="ghost"
              onClick={() => handleRateMovie(ratingValue)}
              aria-label={`Rate ${ratingValue} stars`}
            />
          </Tooltip>
        ))}
      </HStack>
      {isRated && (
        <Tooltip label="Remove Rating" hasArrow>
          <Button
            colorScheme="red"
            variant="outline"
            size="md"
            onClick={handleRemoveRating}
            leftIcon={<DeleteIcon />}
            mx="auto"
            display="block">
            Remove Rating
          </Button>
        </Tooltip>
      )}
    </Box>
  );
};

export default RatingButtons;
