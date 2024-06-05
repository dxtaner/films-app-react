import React from "react";
import { useSelector } from "react-redux";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import MovieGenres from "./MovieGenres";
import MovieImage from "./MovieImage";
import { detailsList } from "../../app/features/movies/details/detailsSlice";
import MovieExternalIds from "./MovieExternalIds";

const MovieHeader = () => {
  const movieDetails = useSelector(detailsList);

  const imageUrlBase = "https://image.tmdb.org/t/p/original";
  const fullImageUrl = movieDetails.backdrop_path
    ? `${imageUrlBase}${movieDetails.backdrop_path}`
    : null;

  const isSmallScreen = useBreakpointValue({ base: true, sm: false });

  return (
    <Box position="relative">
      <MovieImage
        imageUrl={fullImageUrl}
        altText={movieDetails.original_title}
      />
      {isSmallScreen ? (
        <Box p={2} fontSize={["xs", "sm", "md"]}>
          <Flex direction="column" alignItems="center">
            <MovieGenres genres={movieDetails.genres} />
          </Flex>
          <Flex direction="column" alignItems="flex-start">
            <Box bg="" p={[1, 2]}>
              <MovieExternalIds />
            </Box>
          </Flex>
        </Box>
      ) : (
        <>
          <Box
            position="absolute"
            bottom={[0, 0]}
            left={[0, 0]}
            bg=""
            borderRadius="md"
            p={[1, 2]}
            fontSize={["xxs", "xs", "sm", "md"]}>
            <MovieExternalIds />
          </Box>
          <Box
            position="absolute"
            top={[1, 2]}
            right={[1, 2]}
            bg=""
            borderRadius="md"
            p={[1, 2]}
            fontSize={["xxs", "xs", "sm", "md"]}>
            <MovieGenres genres={movieDetails.genres} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default MovieHeader;
