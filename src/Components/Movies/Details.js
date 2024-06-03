import React from "react";
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

const Details = () => {
  return (
    <VStack
      spacing={10}
      p={["4", "6", "8"]}
      fontSize={["md", "lg", "xl", "2xl"]}
      maxW="90%"
      mx="auto"
      alignItems="stretch"
      bg="gray.50"
      borderRadius="md"
      boxShadow="lg">
      <Box p={4} bg="white" borderRadius="md" boxShadow="md">
        <Heading size="lg" mb={4} borderBottom="3px solid gold">
          Popüler Filmler
        </Heading>
        <PagePopularMovies />
      </Box>

      <Box w="100%" p={2} bg="white" borderRadius="md" boxShadow="md">
        <Title text="İzleme Sağlayıcıları" />
        <MovieProviders />
      </Box>

      <Divider borderColor="gray.300" />

      <Box w="100%" p={2} bg="white" borderRadius="md" boxShadow="md">
        <MovieDetails />
      </Box>

      <Divider borderColor="gray.300" />

      <Box w="100%" p={2} bg="white" borderRadius="md" boxShadow="md">
        <Title text="Film Ekibi" />
        <MovieCredits />
      </Box>

      <Divider borderColor="gray.300" />

      <Box w="100%" p={2} bg="white" borderRadius="md" boxShadow="md">
        <Title text="Filmden Kareler" />
        <MovieImages />
      </Box>

      <Divider borderColor="gray.300" />

      <Box w="100%" p={2} bg="white" borderRadius="md" boxShadow="md">
        <Title text="Filmin Yorumları" />
        <ReviewsMovies />
      </Box>

      <Divider borderColor="gray.300" />

      <Box w="100%" p={2} bg="white" borderRadius="md" boxShadow="md">
        <Title text="Etiketler" />
        <KeywordMovies />
      </Box>

      <Divider borderColor="gray.300" />

      <Box w="100%" p={2} bg="white" borderRadius="md" boxShadow="md">
        <Title text="Benzer Filmler" />
        <SimilarMovies />
      </Box>
    </VStack>
  );
};

export default Details;
