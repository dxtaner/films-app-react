import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
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

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(movieId));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(movieId));
  };

  const isFavorite = favorites.some((item) => item.id === movieId);

  return (
    <Tooltip label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
      <Button
        onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
        colorScheme={isFavorite ? "red" : "gray"}
        variant="outline"
        size="lg"
        leftIcon={<FaHeart />}>
        {isFavorite ? "Favorited" : "Add to Favorites"}
      </Button>
    </Tooltip>
  );
};

export default FavoriteButton;
