import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdMoreVert } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faHeart,
  faHeartBroken,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import nullImage from "../NullImage/null.png";
import {
  getFavorites,
  favoritesList,
} from "../../app/features/movies/favoritesSlice.js";
import {
  getWatchList,
  watchListMovies,
} from "../../app/features/movies/watchListSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  addToWatchList,
  remevoToWatchList,
} from "../../app/features/movies/details/detailsSlice";

const MotionBox = motion.div;

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(favoritesList);
  const watchList = useSelector(watchListMovies);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const isAuth = sessionStorage.getItem("session_id");
  const token = sessionStorage.getItem("session_id");

  const watchListIDs = watchList ? watchList.map((watch) => watch.id) : [];
  const favoriteIDs = favorites ? favorites.map((favorite) => favorite.id) : [];
  useEffect(() => {
    if (token) {
      dispatch(getFavorites());
      dispatch(getWatchList());
    }
  }, [dispatch, token, movie.id]);

  const showDetails = () => {
    navigate(`/movieDetails/${movie.id}`, { state: movie });
  };

  const addToToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    dispatch(addToFavorites(movie.id, true));
  };

  const removeToToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    dispatch(removeFromFavorites(movie.id, true));
  };

  const addToToggleWatchlist = () => {
    setIsWatchlist(!isWatchlist);
    dispatch(addToWatchList(movie.id, true));
  };

  const removeToToggleWatchlist = () => {
    setIsWatchlist(!isWatchlist);
    dispatch(remevoToWatchList(movie.id, true));
  };

  const { poster_path, release_date, vote_average } = movie;
  const backdropImageUrl =
    poster_path && poster_path !== "null"
      ? `https://image.tmdb.org/t/p/original${poster_path}`
      : nullImage;

  const getVoteColor = (voteAverage) => {
    const newVoteAverage = voteAverage * 10;
    if (newVoteAverage >= 70) {
      return "green";
    } else if (newVoteAverage >= 50) {
      return "yellow";
    } else {
      return "red";
    }
  };

  return (
    <Box
      cursor="pointer"
      m={2}
      p={2}
      width={{ base: "200px", md: "250px" }}
      borderRadius="lg"
      boxShadow="lg"
      backgroundColor="white"
      transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out">
      <MotionBox whileHover={{ scale: 1.02 }}>
        <Box
          position="relative"
          borderRadius="md"
          cursor="pointer"
          overflow="hidden"
          height={{ base: "250px", md: "320px" }}>
          <Image
            src={backdropImageUrl}
            alt={movie.title}
            objectFit="cover"
            onClick={showDetails}
          />
          <Text
            fontSize="md"
            fontWeight="extrabold"
            color={getVoteColor(vote_average)}
            position="absolute"
            bottom="5px"
            right="5px"
            backgroundColor="rgba(255, 255, 255, 0.9)"
            paddingX={2}
            paddingY={1}
            borderRadius="15px"
            zIndex="1">
            {vote_average.toFixed(1) * 10}%
          </Text>
          <Menu
            isOpen={isMenuOpen}
            onOpen={() => setIsMenuOpen(true)}
            onClose={() => setIsMenuOpen(false)}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<MdMoreVert />}
              position="absolute"
              top={2}
              right={2}
              zIndex="2"
              size="sm"
            />
            <MenuList fontSize="sm">
              {!isAuth ? (
                <MenuItem size="xs" onClick={() => navigate("/auth/login")}>
                  <FontAwesomeIcon icon={faSignInAlt} /> Giriş Yap
                </MenuItem>
              ) : (
                <>
                  {favoriteIDs.includes(movie.id) ? (
                    <MenuItem
                      size="xs"
                      onClick={removeToToggleFavorite}
                      icon={
                        <Box
                          as={FontAwesomeIcon}
                          icon={faHeartBroken}
                          fontSize="1.5rem"
                          marginRight="0.5rem"
                        />
                      }>
                      <Text fontWeight="bold" fontSize="sm">
                        Remove from Favorites
                      </Text>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      size="xs"
                      onClick={addToToggleFavorite}
                      icon={
                        <Box
                          as={FontAwesomeIcon}
                          icon={faHeart}
                          fontSize="1.5rem"
                          marginRight="0.5rem"
                        />
                      }>
                      <Text fontWeight="bold" fontSize="sm">
                        Add to Favorites
                      </Text>
                    </MenuItem>
                  )}

                  <Divider />
                  {watchListIDs.includes(movie.id) ? (
                    <MenuItem
                      size="xs"
                      onClick={removeToToggleWatchlist}
                      icon={
                        <Box
                          as={FontAwesomeIcon}
                          icon={faMinusCircle}
                          fontSize="1.5rem"
                          marginRight="0.5rem"
                        />
                      }>
                      <Text fontWeight="bold" fontSize="sm">
                        Remove from Watchlist
                      </Text>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      size="xs"
                      onClick={addToToggleWatchlist}
                      icon={
                        <Box
                          as={FontAwesomeIcon}
                          icon={faPlusCircle}
                          fontSize="1.5rem"
                          marginRight="0.5rem"
                        />
                      }>
                      <Text fontWeight="bold" fontSize="sm">
                        Add to WatchList
                      </Text>
                    </MenuItem>
                  )}
                </>
              )}
            </MenuList>
          </Menu>
        </Box>
      </MotionBox>
      <Box p={2}>
        <Text
          fontWeight="extrabold"
          fontSize="lg"
          noOfLines={2}
          cursor="pointer"
          color="black"
          onClick={showDetails}
          _hover={{ color: "teal.500" }}>
          {movie.title}
        </Text>
        <Text
          fontSize="sm"
          color="gray.600"
          whiteSpace="nowrap"
          mt={0}
          overflow="hidden"
          textOverflow="ellipsis">
          {release_date}
        </Text>
      </Box>
    </Box>
  );
};

export default MovieCard;
