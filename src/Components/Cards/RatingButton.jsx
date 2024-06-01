import React, { useEffect } from "react";
import { IconButton, Tooltip, Box } from "@chakra-ui/react";
import { StarIcon, MinusIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToMovieRating,
  removeFromRating,
} from "../../app/features/movies/details/detailsSlice";
import {
  fetchRatedMovies,
  selectRatedMovies,
} from "../../app/features/movies/ratedMovieSlice";

const RatingButton = ({ movieId }) => {
  const dispatch = useDispatch();
  const ratedMovies = useSelector(selectRatedMovies);

  useEffect(() => {
    dispatch(fetchRatedMovies());
  }, [dispatch]);

  const handleRemoveRating = () => {
    dispatch(removeFromRating(movieId));
  };

  const handleRateMovie = () => {
    dispatch(addToMovieRating(movieId));
  };

  const ratedMovie = ratedMovies.find((item) => item.id === movieId);

  return (
    <Box m={2}>
      <Tooltip
        label={ratedMovie ? "Remove Rating" : "Rate Movie"}
        placement="top">
        <IconButton
          icon={ratedMovie ? <MinusIcon /> : <StarIcon />}
          onClick={ratedMovie ? handleRemoveRating : handleRateMovie}
          size="md"
          colorScheme={ratedMovie ? "yellow" : "gray"}
          aria-label={ratedMovie ? "Remove Rating" : "Rate Movie"}
        />
      </Tooltip>
    </Box>
  );
};

export default RatingButton;
