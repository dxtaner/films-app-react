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
  const watchlist = useSelector(watchListMovies);

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
      label={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}>
      <Button
        onClick={
          isInWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist
        }
        colorScheme={isInWatchlist ? "blue" : "gray"}
        variant="outline"
        size="lg"
        leftIcon={<FaEye />}>
        {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
      </Button>
    </Tooltip>
  );
};

export default WatchlistButton;
