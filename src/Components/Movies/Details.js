import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Box, Text, VStack, Heading } from "@chakra-ui/react";
import {
  addToFavorites,
  addToWatchList,
  detailsList,
  getDetails,
  addToMovieRating,
} from "../../app/features/movies/details/detailsSlice.js";
import MovieCredits from "./MovieCredits";
import MovieDetails from "./MovieDetails";
import Title from "../Title/titles.js";
import YoutubeEmbed from "../Youtube/YoutubeEmbed.js";
import SimiliarMovies from "./SimiliarMovies.js";
import {
  getTrailer,
  trailerList,
} from "../../app/features/movies/details/trailerSlice.js";
import {
  fetchSimilarMovies,
  selectSimilarMovies,
} from "../../app/features/movies/details/similarSlice.js";
import {
  creditList,
  getCredit,
} from "../../app/features/movies/details/creditSlice.js";
import {
  fetchMovieExternalIds,
  selectMovieExternalIds,
} from "../../app/features/movies/details/movieExternalIdsSlice.js";
import PagePopularMovies from "./PopularMovies.js";

const Details = () => {
  const dispatch = useDispatch();
  const movieDetails = useSelector(detailsList);
  const movieTrailer = useSelector(trailerList);
  const movieCredits = useSelector(creditList);
  const movieSimilar = useSelector(selectSimilarMovies);
  const movieExternalIds = useSelector(selectMovieExternalIds);
  const location = useLocation();
  const isAuth = sessionStorage.getItem("session_id");

  useEffect(() => {
    dispatch(getDetails(location.state.id));
    dispatch(getTrailer(location.state.id));
    dispatch(getCredit(location.state.id));
    dispatch(fetchMovieExternalIds(location.state.id));
    dispatch(fetchSimilarMovies(location.state.id));
  }, [dispatch, location.state.id]);

  const handleFavoriteClick = () => {
    dispatch(addToFavorites(location.state.id, true));
  };

  const handleWatchListClick = () => {
    dispatch(addToWatchList(location.state.id, true));
  };

  return (
    <VStack
      spacing={4}
      p={["4", "4", "6", "6"]}
      fontSize={["md", "lg", "xl", "2xl"]}
      textAlign="center"
      maxW="1200px"
      mx="auto"
      alignItems="stretch">
      {/* Üst Taraf: Popüler Filmler */}
      <VStack spacing={4} w="100%">
        <Heading as="h2" fontSize="2xl">
          Popüler Filmler
        </Heading>
        <PagePopularMovies />
      </VStack>

      {/* Alt Taraf: Film Detayları */}
      <VStack spacing={4} w="100%">
        {movieDetails ? (
          <>
            <MovieDetails
              movieDetails={movieDetails}
              isAuth={isAuth}
              movieExternalIds={movieExternalIds}
              handleFavoriteClick={handleFavoriteClick}
              handleWatchListClick={handleWatchListClick}
              rating={addToMovieRating}
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

            {movieSimilar.length > 0 ? (
              <SimiliarMovies movieSimilar={movieSimilar} />
            ) : (
              <Text fontWeight="bold">Benzer filmler bulunamadı.</Text>
            )}
          </>
        ) : (
          <Text fontSize="lg">Veriler yükleniyor...</Text>
        )}
      </VStack>
    </VStack>
  );
};

export default Details;
