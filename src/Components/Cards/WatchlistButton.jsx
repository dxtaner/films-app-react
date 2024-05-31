import React, { useEffect } from "react";
import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import { FaEye, FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
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

  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchList(movieId));
    } else {
      dispatch(addToWatchList(movieId));
    }
  };

  const isInWatchlist = watchlist.some((item) => item.id === movieId);

  return (
    <Box onClick={handleToggleWatchlist} m={2}>
      <Tooltip
        label={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}>
        <IconButton
          icon={isInWatchlist ? <FaEye /> : <FaRegEye />}
          size="md"
          colorScheme={isInWatchlist ? "teal" : "gray"}
        />
      </Tooltip>
    </Box>
  );
};

export default WatchlistButton;
