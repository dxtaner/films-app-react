import React from "react";
import { Box, Heading, Text, Link } from "@chakra-ui/react";

const MovieExternalIds = ({ movieExternalIds }) => {
  const { imdb_id, wikidata_id, facebook_id, twitter_id, instagram_id } =
    movieExternalIds;

  return (
    <Box
      p={6}
      boxShadow="lg"
      borderRadius="lg"
      bg="white"
      maxW="800px"
      mx="auto"
      borderWidth={1}
      borderColor="gray.200"
      textAlign="center"
      fontSize={["lg", "xl", "2xl", "3xl"]}
      lineHeight="taller"
      color="teal.600">
      <Heading fontSize="2xl" mb={4}>
        Dış Film Bilgileri
      </Heading>
      {imdb_id && (
        <Text fontSize="lg" mb={2}>
          IMDb bilgileri için tıklayın:{" "}
          <Link
            href={`https://www.imdb.com/title/${imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            color="teal.600"
            textDecoration="underline">
            IMDb
          </Link>
        </Text>
      )}
      {wikidata_id && (
        <Text fontSize="lg" mb={2}>
          WikiData bilgileri için tıklayın:{" "}
          <Link
            href={`https://www.wikidata.org/wiki/${wikidata_id}`}
            target="_blank"
            rel="noopener noreferrer"
            color="teal.600"
            textDecoration="underline">
            WikiData
          </Link>
        </Text>
      )}
      {facebook_id && (
        <Text fontSize="lg" mb={2}>
          Facebook sayfası için tıklayın:{" "}
          <Link
            href={`https://www.facebook.com/${facebook_id}`}
            target="_blank"
            rel="noopener noreferrer"
            color="teal.600"
            textDecoration="underline">
            Facebook
          </Link>
        </Text>
      )}
      {twitter_id && (
        <Text fontSize="lg" mb={2}>
          Twitter hesabı için tıklayın:{" "}
          <Link
            href={`https://www.twitter.com/${twitter_id}`}
            target="_blank"
            rel="noopener noreferrer"
            color="teal.600"
            textDecoration="underline">
            Twitter
          </Link>
        </Text>
      )}
      {instagram_id && (
        <Text fontSize="lg">
          Instagram hesabı için tıklayın:{" "}
          <Link
            href={`https://www.instagram.com/${instagram_id}`}
            target="_blank"
            rel="noopener noreferrer"
            color="teal.600"
            textDecoration="underline">
            Instagram
          </Link>
        </Text>
      )}
    </Box>
  );
};

export default MovieExternalIds;
