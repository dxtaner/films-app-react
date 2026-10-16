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
    <Box m={1}>
      <Tooltip
        label={ratedMovie ? "Puanı Kaldır" : "Film Puanla"}
        placement="top"
        hasArrow
      >
        <IconButton
          icon={ratedMovie ? <MinusIcon /> : <StarIcon />}
          onClick={ratedMovie ? handleRemoveRating : handleRateMovie}
          size="sm"
          variant="solid"
          colorScheme={ratedMovie ? "yellow" : "gray"}
          bg={ratedMovie ? "yellow.500" : "gray.800"}
          color={ratedMovie ? "white" : "gray.300"}
          _hover={{
            bg: ratedMovie ? "yellow.600" : "gray.700",
            transform: "scale(1.05)",
          }}
          transition="all 0.2s"
          aria-label={ratedMovie ? "Remove Rating" : "Rate Movie"}
          borderRadius="full"
        />
      </Tooltip>
    </Box>
  );
};

export default RatingButton;
