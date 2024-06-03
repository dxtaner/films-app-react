import React, { useEffect } from "react";
import { VStack, HStack, Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDetails,
  detailsList,
} from "../../app/features/movies/details/detailsSlice";
import FavoriteButton from "./FavoriteButton";
import WatchlistButton from "./WatchlistButton";
import RatingButtons from "./RatingButtons";

const MovieRating = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = sessionStorage.getItem("session_id");
  const movieDetails = useSelector(detailsList);
  const movieId = movieDetails?.id;
  const isAuth = !!token;

  useEffect(() => {
    if (id) {
      dispatch(getDetails(id));
    }
  }, [dispatch, id]);

  return (
    <VStack
      spacing={6}
      p={6}
      borderRadius="md"
      boxShadow="xl"
      maxW="lg"
      wrap="wrap"
      mx="auto"
      alignItems="stretch"
      justifyContent="center">
      {isAuth && movieId && (
        <>
          <HStack spacing={4} wrap="wrap" justifyContent="center">
            <FavoriteButton movieId={movieId} />
            <WatchlistButton movieId={movieId} />
          </HStack>
          <Box textAlign="center">
            <RatingButtons movieId={movieId} />
          </Box>
        </>
      )}
    </VStack>
  );
};

export default MovieRating;
