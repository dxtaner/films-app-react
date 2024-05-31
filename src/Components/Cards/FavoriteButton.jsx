import React, { useEffect } from "react";
import { IconButton, Tooltip, Box } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../app/features/movies/details/detailsSlice";
import {
  favoritesListMovies,
  getFavorites,
} from "../../app/features/movies/favoritesSlice";

const FavoriteButton = ({ movieId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(favoritesListMovies);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movieId));
    } else {
      dispatch(addToFavorites(movieId));
    }
  };

  const isFavorite = favorites.some((item) => item.id === movieId);

  return (
    <Box onClick={handleToggleFavorite} m={2}>
      <Tooltip
        label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
        <IconButton
          icon={isFavorite ? <FaHeart /> : <FaRegHeart />}
          size="md"
          colorScheme={isFavorite ? "red" : "gray"}
        />
      </Tooltip>
    </Box>
  );
};

export default FavoriteButton;
