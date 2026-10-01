import { useSelector } from "react-redux";
import { VStack, Box, Divider, Heading } from "@chakra-ui/react";
import MovieDetails from "./MovieDetails";
import Title from "../Title/titles";
import PagePopularMovies from "./PopularMovies";
import MovieCredits from "./MovieCredits";
import SimilarMovies from "./SimiliarMovies";
import ReviewsMovies from "./ReviewsMovies";
import KeywordMovies from "./KeywordMovies";
import MovieImages from "./MovieImages";
import MovieProviders from "./MovieProviders";

import { detailsList } from "../../app/features/movies/details/detailsSlice";
import { selectSimilarMovies } from "../../app/features/movies/details/similarSlice";

const Details = () => {
  const movieDetails = useSelector(detailsList);
  const similarMovies = useSelector(selectSimilarMovies);
  const { providers } = useSelector((state) => state.movieProviders || {});
  const { movieReviews } = useSelector((state) => state.movieReviews || {});

  return (
    <VStack
      spacing={8}
      p={["4", "6", "8"]}
      maxW="1200px"
      mx="auto"
      alignItems="stretch"
      bg="gray.950"
    >
      <Box
        p={5}
        bg="gray.900"
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.800"
        boxShadow="xl"
      >
        <Heading
          size="md"
          mb={4}
          color="white"
          borderBottom="2px solid"
          borderColor="red.600"
          pb={2}
        >
          Popüler Filmler
        </Heading>
        <PagePopularMovies />
      </Box>

      {providers && Object.keys(providers).length > 0 && (
        <>
          <Divider borderColor="gray.800" />
          <Box
            w="100%"
            p={5}
            bg="gray.900"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.800"
            boxShadow="xl"
          >
            <Title text="İzleme Sağlayıcıları" />
            <MovieProviders />
          </Box>
        </>
      )}

      {movieDetails && (
        <>
          <Divider borderColor="gray.800" />
          <Box
            w="100%"
            p={5}
            bg="gray.900"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.800"
            boxShadow="xl"
          >
            <MovieDetails />
          </Box>
        </>
      )}

      <Divider borderColor="gray.800" />
      <Box
        w="100%"
        p={5}
        bg="gray.900"
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.800"
        boxShadow="xl"
      >
        <Title text="Film Ekibi" />
        <MovieCredits />
      </Box>

      <Divider borderColor="gray.800" />
      <Box
        w="100%"
        p={5}
        bg="gray.900"
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.800"
        boxShadow="xl"
      >
        <Title text="Filmden Kareler" />
        <MovieImages />
      </Box>

      {movieReviews && movieReviews.length > 0 && (
        <>
          <Divider borderColor="gray.800" />
          <Box
            w="100%"
            p={5}
            bg="gray.900"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.800"
            boxShadow="xl"
          >
            <Title text="Filmin Yorumları" />
            <ReviewsMovies />
          </Box>
        </>
      )}

      <Divider borderColor="gray.800" />
      <Box
        w="100%"
        p={5}
        bg="gray.900"
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.800"
        boxShadow="xl"
      >
        <Title text="Etiketler" />
        <KeywordMovies />
      </Box>

      {similarMovies && similarMovies.length > 0 && (
        <>
          <Divider borderColor="gray.800" />
          <Box
            w="100%"
            p={5}
            bg="gray.900"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.800"
            boxShadow="xl"
          >
            <Title text="Benzer Filmler" />
            <SimilarMovies />
          </Box>
        </>
      )}
    </VStack>
  );
};

export default Details;
