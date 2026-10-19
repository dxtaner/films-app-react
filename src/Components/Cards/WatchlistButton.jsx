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

  const isInWatchlist = watchlist.some((item) => item.id === movieId);

  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchList(movieId));
    } else {
      dispatch(addToWatchList(movieId));
    }
  };

  return (
    <Box onClick={handleToggleWatchlist} m={1}>
      <Tooltip
        label={
          isInWatchlist ? "İzleme Listesinden Çıkar" : "İzleme Listesine Ekle"
        }
        hasArrow
      >
        <IconButton
          icon={isInWatchlist ? <FaEye /> : <FaRegEye />}
          size="sm"
          bg={isInWatchlist ? "teal.500" : "gray.800"}
          color={isInWatchlist ? "white" : "gray.300"}
          _hover={{
            bg: isInWatchlist ? "teal.600" : "gray.700",
            transform: "scale(1.05)",
          }}
          transition="all 0.2s"
          aria-label="Watchlist toggle"
          borderRadius="full"
        />
      </Tooltip>
    </Box>
  );
};

export default WatchlistButton;
