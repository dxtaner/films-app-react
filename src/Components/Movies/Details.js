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
import {
  fetchMovieExternalIds, // Dış kimlik bilgilerini alma işlemi
  selectMovieExternalIds, // Dış kimlik bilgilerini seçmek için selektör
} from "../../app/features/movies/details/movieExternalIdsSlice.js"; //
import PagePopularMovies from "./PopularMovies.js";

const Details = () => {
  const dispatch = useDispatch();
  const movieDetails = useSelector(detailsList);
  const movieTrailer = useSelector(trailerList);
  const movieCredits = useSelector(creditList);
  const movieExternalIds = useSelector(selectMovieExternalIds);
  const location = useLocation();
  const isAuth = sessionStorage.getItem("session_id");

  useEffect(() => {
    dispatch(getDetails(location.state.id));
    dispatch(getTrailer(location.state.id));
    dispatch(getCredit(location.state.id));
    dispatch(fetchMovieExternalIds(location.state.id));
  }, [dispatch, location.state.id]);

  const handleFavoriteClick = () => {
    dispatch(addToFavorites(location.state.id, true));
  };

  console.log("movieExternalIds", movieExternalIds);
  // console.log("movieTrailer", movieTrailer);
  // console.log("movieDetails", movieDetails);

  return (
    <HStack
      spacing={4}
      p={["4", "4", "6", "6"]}
      fontSize={["md", "lg", "xl", "2xl"]}
      textAlign="center"
      maxW="1200px"
      mx="auto"
      alignItems="stretch"
      flexDirection={["column", "column", "row", "row"]} // Düzeni ayarla
    >
      {/* Sol Taraf */}
      <VStack
        spacing={4}
        w={["100%", "100%", "20%", "20%"]}
        mr={[0, 0, 20, 20]}
        ml={[0, 0, -20, -20]}>
        <PagePopularMovies />
      </VStack>

      {/* Sağ Taraf */}
      <VStack
        spacing={4}
        w={["100%", "100%", "80%", "80%"]}
        ml={[0, 0, 50, 50]}
        mr={[0, 0, -50, -50]}>
        <MovieDetails
          movieDetails={movieDetails}
          isAuth={isAuth}
          movieExternalIds={movieExternalIds}
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
