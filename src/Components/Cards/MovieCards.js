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
      w="100%"
      mx="auto"
      mb={6}
      bg="gray.800"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="xl"
      overflow="hidden"
      position="relative"
      boxShadow="lg"
      transition="all 0.3s cubic-bezier(.25,.8,.25,1)"
      _hover={{
        transform: "translateY(-6px)",
        borderColor: "red.600",
        boxShadow: "0 12px 24px -10px rgba(229, 62, 62, 0.3)",
      }}
    >
      <Box
        position="relative"
        onMouseEnter={() => setIsMenuVisible(true)}
        onMouseLeave={() => setIsMenuVisible(false)}
      >
        <MovieImage movie={movie} handleShowDetails={handleShowDetails} />
        {isAuth && isMenuVisible && (
          <Box position="absolute" top={2} left={2} zIndex="2">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<ChevronDownIcon color="white" />}
                variant="solid"
                bg="rgba(15, 23, 42, 0.8)"
                _hover={{ bg: "red.600" }}
                _active={{ bg: "red.700" }}
                size="sm"
                borderRadius="lg"
                backdropFilter="blur(4px)"
              />
              <MenuList
                bg="gray.900"
                p={2}
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.700"
                boxShadow="2xl"
              >
                <Box m={1}>
                  <FavoriteButton bg="red" movieId={movie.id} />
                </Box>
                <Box m={1}>
                  <WatchlistButton movieId={movie.id} />
                </Box>
                <Box m={1}>
                  {ratedMovie ? (
                    <RatingButton movieId={movie.id} />
                  ) : (
                    <RatingStars handleRateMovie={handleRateMovie} />
                  )}
                </Box>
              </MenuList>
            </Menu>
          </Box>
        )}
        {ratedMovie && isMenuVisible && (
          <Box position="absolute" bottom={2} left={2} zIndex="2">
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
