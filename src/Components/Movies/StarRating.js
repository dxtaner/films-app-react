import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToMovieRating } from "../../app/features/movies/details/detailsSlice.js";
import { showSuccessMessage } from "../Alerts.js";
import { HStack, Box } from "@chakra-ui/react";

const StarRating = ({ value = 0, movieDetailsId, onRatingChange }) => {
  const [hoverValue, setHoverValue] = useState(0);
  const dispatch = useDispatch();

  const handleMouseEnter = (newValue) => setHoverValue(newValue);
  const handleMouseLeave = () => setHoverValue(0);

  const handleClick = (newValue) => {
    dispatch(addToMovieRating({ movieId: movieDetailsId, rating: newValue }));
    showSuccessMessage("Film başarıyla derecelendirildi");
    onRatingChange(newValue === value ? 0 : newValue);
  };

  return (
    <HStack spacing={1}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hoverValue || value);
        return (
          <Box
            key={star}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(star)}
            cursor="pointer"
            p={1}
          >
            <FaStar color={filled ? "#ECC94B" : "#E2E8F0"} size={28} />
          </Box>
        );
      })}
    </HStack>
  );
};

export default StarRating;
