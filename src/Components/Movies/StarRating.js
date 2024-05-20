import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToMovieRating } from "../../app/features/movies/details/detailsSlice.js";
import { showSuccessMessage } from "../Alerts.js";
import { Box } from "@chakra-ui/react";

const StarRating = ({ value, movieDetailsId, onRatingChange }) => {
  const [hoverValue, setHoverValue] = useState(0);
  const dispatch = useDispatch();

  const handleMouseEnter = (newValue) => {
    setHoverValue(newValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleClick = (newValue) => {
    dispatch(addToMovieRating({ movieId: movieDetailsId, rating: newValue }));
    showSuccessMessage("Film başarıyla derecelendirildi");
    onRatingChange(newValue === value ? 0 : newValue);
  };

  return (
    <Box display="flex">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hoverValue || value);
        return (
          <Box
            key={star}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(star)}
            style={{ display: "inline-block", marginRight: "5px" }}>
            <FaStar
              color={filled ? "yellow" : "gray"}
              size={28}
              style={{ cursor: "pointer" }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default StarRating;
