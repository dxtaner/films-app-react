import React from "react";
import { VStack, Button, Text } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md"; // İzleme listesine eklemek için
import MovieImage from "./MovieImage";
import MovieGenres from "./MovieGenres";
import MovieOverview from "./MovieOverview";
import MovieExternalIds from "./MovieExternalIds";

const MovieDetails = ({
  movieDetails,
  isAuth,
  handleFavoriteClick,
  handleWatchListClick,
  movieExternalIds,
}) => {
  if (!movieDetails || !movieDetails.imdb_id) {
    console.error("movieDetails veya imdb_id eksik.");
    return null;
  }

  if (!movieDetails) {
    return (
      <VStack
        p={[4, 4, 6, 6]}
        fontSize={["md", "lg", "xl", "2xl"]}
        textAlign="center"
        maxW="1800px"
        mx="auto"
        alignItems="stretch">
        <Text fontSize="xl">Film bilgileri yükleniyor...</Text>
      </VStack>
    );
  }

  const { backdrop_path, original_title, genres } = movieDetails;

  const backdropImageUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <VStack
      p={[4, 4, 6, 6]}
      fontSize={["md", "lg", "xl", "2xl"]}
      textAlign="center"
      maxW="1800px"
      mx="auto"
      alignItems="stretch">
      <MovieImage imageUrl={backdropImageUrl} altText={original_title} />
      <MovieGenres genres={genres} />
      <MovieOverview title={original_title} movieDetails={movieDetails} />
      <MovieExternalIds
        imdbId={movieExternalIds.imdb_id}
        wikidataId={movieExternalIds.wikidata_id}
      />

      {isAuth && (
        <>
          <Button
            leftIcon={<AiOutlineHeart />}
            colorScheme="red"
            size="lg"
            onClick={handleFavoriteClick}
            width="100%"
            borderRadius="md"
            _hover={{
              bgColor: "red.600",
              color: "white",
            }}
            mb={4}>
            Favori Filmlere Ekle
          </Button>

          <Button
            leftIcon={<MdPlaylistAdd />}
            colorScheme="blue"
            size="lg"
            onClick={handleWatchListClick} // İzleme listesine ekleme işlevi
            width="100%"
            borderRadius="md"
            _hover={{
              bgColor: "blue.600",
              color: "white",
            }}>
            İzleme Listeme Ekle
          </Button>
        </>
      )}
    </VStack>
  );
};

export default MovieDetails;
