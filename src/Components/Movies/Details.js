import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { VStack, Box, HStack } from "@chakra-ui/react";
import {
  addToFavorites,
  detailsList,
  getDetails,
} from "../../app/features/movies/details/detailsSlice.js";
import MovieCredits from "./MovieCredits";
import MovieDetails from "./MovieDetails";
import Title from "../Title/titles.js";
import YoutubeEmbed from "../Youtube/YoutubeEmbed.js";
import {
  getTrailer,
  trailerList,
} from "../../app/features/movies/details/trailerSlice.js";
import {
  creditList,
  getCredit,
} from "../../app/features/movies/details/creditSlice.js";
import PagePopularMovies from "./PopularMovies.js";

const Details = () => {
  const dispatch = useDispatch();
  const movieDetails = useSelector(detailsList);
  const movieTrailer = useSelector(trailerList);
  const movieCredits = useSelector(creditList);
  const location = useLocation();
  const isAuth = sessionStorage.getItem("session_id");

  useEffect(() => {
    dispatch(getDetails(location.state.id));
    dispatch(getTrailer(location.state.id));
    dispatch(getCredit(location.state.id));
  }, [dispatch, location.state.id]);

  const handleFavoriteClick = () => {
    dispatch(addToFavorites(location.state.id, true));
  };

  return (
    <HStack
      spacing={4}
      p={["4", "4", "6", "6"]}
      fontSize={["md", "lg", "xl", "2xl"]}
      textAlign="center"
      maxW="1200px"
      mx="auto"
      alignItems="stretch">
      <VStack
        spacing={4}
        w="20%" // Sol tarafı kaplaması için genişlik ayarı
        mr={20}
        ml={-20}>
        <PagePopularMovies />
      </VStack>
      <VStack
        spacing={4}
        w="80%" // Sağ tarafı kaplaması için genişlik ayarı
        ml={50}
        mr={-50}>
        <MovieDetails
          movieDetails={movieDetails}
          isAuth={isAuth}
          handleFavoriteClick={handleFavoriteClick}
        />
        <MovieCredits credits={movieCredits} />
        <Box width="full">
          <Title text="Trailer" />
          {movieTrailer.length > 0 ? (
            <YoutubeEmbed embedId={movieTrailer[0].key} />
          ) : (
            <Box fontSize="lg">Bu filmin fragmanı yok</Box>
          )}
        </Box>
      </VStack>
    </HStack>
  );
};

export default Details;
