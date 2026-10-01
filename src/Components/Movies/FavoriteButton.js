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
    <Tooltip label={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}>
      <Button
        onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
        colorScheme="red"
        variant={isFavorite ? "solid" : "outline"}
        bg={isFavorite ? "red.600" : "transparent"}
        borderColor="red.600"
        color="white"
        _hover={{ bg: isFavorite ? "red.700" : "rgba(229, 62, 62, 0.2)" }}
        size="md"
        width="100%"
        leftIcon={<FaHeart />}
        borderRadius="lg"
      >
        {isFavorite ? "Favorilerde" : "Favorilere Ekle"}
      </Button>
    </Tooltip>
  );
};

export default FavoriteButton;
