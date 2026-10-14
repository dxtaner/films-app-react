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

  const isFavorite = favorites.some((item) => item.id === movieId);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movieId));
    } else {
      dispatch(addToFavorites(movieId));
    }
  };

  return (
    <Box onClick={handleToggleFavorite} m={1}>
      <Tooltip
        label={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
        hasArrow
      >
        <IconButton
          icon={isFavorite ? <FaHeart /> : <FaRegHeart />}
          size="sm"
          bg={isFavorite ? "red.500" : "gray.800"}
          color={isFavorite ? "white" : "gray.300"}
          _hover={{
            bg: isFavorite ? "red.600" : "gray.700",
            transform: "scale(1.05)",
          }}
          transition="all 0.2s"
          aria-label="Favorite toggle"
          borderRadius="full"
        />
      </Tooltip>
    </Box>
  );
};

export default FavoriteButton;
