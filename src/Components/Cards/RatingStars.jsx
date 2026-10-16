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

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= (hoverRating || selectedRating);
    stars.push(
      <Tooltip
        key={i}
        label={`${i} Yıldız`}
        aria-label={`${i} Star Rating`}
        hasArrow
      >
        <Box
          as="button"
          bg="transparent"
          border="none"
          cursor="pointer"
          outline="none"
          p={1}
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.2)" }}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => {
            setSelectedRating(i);
            handleRateMovie(i);
          }}
        >
          <Icon
            as={StarIcon}
            color={isFilled ? "yellow.400" : "gray.600"}
            boxSize={6}
          />
        </Box>
      </Tooltip>,
    );
  }

  return <Flex gap={1}>{stars}</Flex>;
};

export default RatingStars;
