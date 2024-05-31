import React, { useEffect, useState } from "react";
import { Box, Menu, MenuButton, MenuList, IconButton } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToMovieRating } from "../../app/features/movies/details/detailsSlice";
import {
  fetchRatedMovies,
  selectRatedMovies,
} from "../../app/features/movies/ratedMovieSlice";
import MovieImage from "./MovieImage";
import VoteBadge from "./VoteBadge";
import MovieDetails from "./MovieDetails";
import FavoriteButton from "./FavoriteButton";
import WatchlistButton from "./WatchlistButton";
import RatingButton from "./RatingButton";
import RatedBadge from "./RatedBadge";
import RatingStars from "./RatingStars";

const MovieCards = ({ movie }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ratedMovies = useSelector(selectRatedMovies);
  const isAuth = Boolean(sessionStorage.getItem("session_id"));
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchRatedMovies());
    }
  }, [dispatch, isAuth]);

  const handleShowDetails = (id) => {
    navigate(`/MovieDetails/${id}`, { state: movie });
  };

  const handleRateMovie = (rating) => {
    dispatch(addToMovieRating({ id: movie.id, rating }));
  };

  const ratedMovie = Array.isArray(ratedMovies)
    ? ratedMovies.find((item) => item.id === movie.id)
    : null;

  return (
    <Box
      maxW="250px"
      mx="auto"
      mb="4"
      shadow="md"
      rounded="md"
      overflow="hidden"
      position="relative">
      <Box
        position="relative"
        onMouseEnter={() => setIsMenuVisible(true)}
        onMouseLeave={() => setIsMenuVisible(false)}>
        <MovieImage movie={movie} handleShowDetails={handleShowDetails} />
        {isAuth && isMenuVisible && (
          <Box position="absolute" top="0" left="0" zIndex="1">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<ChevronDownIcon />}
                variant="outline"
                size="md"
                m={2}
              />
              <MenuList bg={""} p="2" borderRadius="md" border={"none"}>
                <Box m={2}>
                  <FavoriteButton bg={"red"} movieId={movie.id} />
                </Box>
                <Box m={2}>
                  <WatchlistButton movieId={movie.id} />{" "}
                </Box>
                <Box m={2}>
                  {ratedMovie ? (
                    <RatingButton movieId={movie.id} />
                  ) : (
                    <RatingStars handleRateMovie={handleRateMovie} />
                  )}{" "}
                </Box>
              </MenuList>
            </Menu>
          </Box>
        )}
        {ratedMovie && isMenuVisible && (
          <Box position="absolute" bottom="0" left="0" zIndex="1">
            <RatedBadge rating={ratedMovie.rating} />
          </Box>
        )}
      </Box>
      <VoteBadge voteAverage={movie.vote_average} />
      <MovieDetails movie={movie} />
    </Box>
  );
};

export default MovieCards;
