import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip } from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import {
  addToWatchList,
  removeFromWatchList,
} from "../../app/features/movies/details/detailsSlice";
import {
  getWatchList,
  watchListMovies,
} from "../../app/features/movies/watchListSlice";

const WatchlistButton = ({ movieId }) => {
  const dispatch = useDispatch();
  const watchlist = useSelector(watchListMovies) || [];

  useEffect(() => {
    dispatch(getWatchList());
  }, [dispatch]);

  const handleAddToWatchlist = () => {
    dispatch(addToWatchList(movieId));
  };

  const handleRemoveFromWatchlist = () => {
    dispatch(removeFromWatchList(movieId));
  };

  const isInWatchlist = watchlist.some((item) => item.id === movieId);

  return (
    <Tooltip
      label={
        isInWatchlist ? "İzleme listesinden çıkar" : "İzleme listesine ekle"
      }
      hasArrow
    >
      <Button
        onClick={
          isInWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist
        }
        colorScheme={isInWatchlist ? "blue" : "gray"}
        variant={isInWatchlist ? "solid" : "outline"}
        size="lg"
        leftIcon={<FaEye />}
        boxShadow="md"
        _hover={{ transform: "translateY(-1px)", boxShadow: "lg" }}
        transition="all 0.2s"
      >
        {isInWatchlist ? "Listede" : "Listeye Ekle"}
      </Button>
    </Tooltip>
  );
};

export default WatchlistButton;
