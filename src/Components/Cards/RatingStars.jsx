import React, { useEffect, useState } from "react";
import { Flex, Icon, Tooltip, Box } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { fetchRatedMovies } from "../../app/features/movies/ratedMovieSlice";

const RatingStars = ({ handleRateMovie }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRatedMovies());
  }, [dispatch]);

  const handleHover = (rating) => {
    setHoverRating(rating);
  };

  const handleLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (rating) => {
    setSelectedRating(rating);
    handleRateMovie(rating);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= (hoverRating || selectedRating);
    stars.push(
      <Tooltip key={i} label={`${i} Star`} aria-label={`${i} Star Rating`}>
        <Box
          as="button"
          sx={{
            border: "none",
            background: "none",
            cursor: "pointer",
            outline: "none",
            transition: "transform 0.2s",
            _hover: {
              transform: "scale(1.1)",
            },
          }}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={handleLeave}
          onClick={() => handleClick(i)}>
          <Icon
            as={StarIcon}
            color={isFilled ? "yellow.400" : "gray.300"}
            boxSize={8}
          />
        </Box>
      </Tooltip>
    );
  }

  return <Flex>{stars}</Flex>;
};

export default RatingStars;
