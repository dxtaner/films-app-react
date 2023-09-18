import React from "react";
import { Box, Heading, Text, Link } from "@chakra-ui/react";

const MovieExternalIds = ({ imdbId, wikidataId }) => {
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
      <Text fontSize="lg">
        IMDb{" "}
        <Link
          href={`https://www.imdb.com/title/${imdbId}`}
          target="_blank"
          rel="noopener noreferrer"
          color="teal.600"
          textDecoration="underline">
          bilgileri için tıklayın..
        </Link>
      </Text>
      <Text fontSize="lg">
        WikiData{" "}
        <Link
          href={`https://www.wikidata.org/wiki/${wikidataId}`}
          target="_blank"
          rel="noopener noreferrer"
          color="teal.600"
          textDecoration="underline">
          bilgileri için tıklayın..
        </Link>
      </Text>
    </Box>
  );
};

export default MovieExternalIds;
