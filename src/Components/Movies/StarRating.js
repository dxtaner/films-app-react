import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToMovieRating } from "../../app/features/movies/details/detailsSlice.js";
import { showSuccessMessage } from "../Alerts.js";

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
    onRatingChange(newValue);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hoverValue || value);
        return (
          <span
            key={star}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(star)}
            style={{ display: "inline-block", marginRight: "5px" }}>
            <FaStar
              color={filled ? "yellow" : "gray"}
              size={24}
              style={{ cursor: "pointer" }}
            />
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
