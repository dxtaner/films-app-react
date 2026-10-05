import React from "react";
import { useSelector } from "react-redux";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import MovieGenres from "./MovieGenres";
import MovieImage from "./MovieImage";
import { detailsList } from "../../app/features/movies/details/detailsSlice";
import MovieExternalIds from "./MovieExternalIds";

const MovieHeader = () => {
  const movieDetails = useSelector(detailsList);

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  if (!movieDetails) return null;

  const imageUrlBase = "https://image.tmdb.org/t/p/original";
  const fullImageUrl = movieDetails.backdrop_path
    ? `${imageUrlBase}${movieDetails.backdrop_path}`
    : null;

  return (
    <Box position="relative" w="100%">
      <MovieImage
        imageUrl={fullImageUrl}
        altText={movieDetails.original_title}
      />
      {isSmallScreen ? (
        <Flex direction="column" align="center" mt={4} gap={2}>
          <MovieGenres genres={movieDetails.genres} />
          <MovieExternalIds />
        </Flex>
      ) : (
        <>
          <Box position="absolute" bottom={4} left={4} zIndex={2}>
            <MovieExternalIds />
          </Box>
          <Box position="absolute" top={4} right={4} zIndex={2}>
            <MovieGenres genres={movieDetails.genres} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default MovieHeader;
