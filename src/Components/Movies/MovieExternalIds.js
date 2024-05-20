import React from "react";
import {
  Box,
  Heading,
  Text,
  Link,
  Stack,
  Icon,
  HStack,
} from "@chakra-ui/react";
import {
  FaImdb,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWikipediaW,
} from "react-icons/fa";

const MovieExternalIds = ({ movieExternalIds }) => {
  if (!movieExternalIds) {
    return null;
  }

  const { imdb_id, wikidata_id, facebook_id, twitter_id, instagram_id } =
    movieExternalIds;

  return (
    <Box
      p={6}
      boxShadow="lg"
      borderRadius="lg"
      bg="gray.100"
      mx="auto"
      borderWidth={1}
      borderColor="gray.200"
      fontSize={["lg", "xl", "2xl", "3xl"]}
      lineHeight="taller">
      <Heading fontSize="2xl" mb={4} textAlign="center">
        Harici Film Bağlantıları
      </Heading>

      <HStack spacing={4} justify="center" wrap="wrap">
        {imdb_id && (
          <Link
            href={`https://www.imdb.com/title/${imdb_id}`}
            target="_blank"
            rel="noopener noreferrer">
            <Stack align="center">
              <Icon as={FaImdb} fontSize="2xl" color="teal.600" />
              <Text fontSize="lg">IMDb</Text>
            </Stack>
          </Link>
        )}

        {wikidata_id && (
          <Link
            href={`https://www.wikidata.org/wiki/${wikidata_id}`}
            target="_blank"
            rel="noopener noreferrer">
            <Stack align="center">
              <Icon as={FaWikipediaW} fontSize="2xl" color="teal.600" />
              <Text fontSize="lg">WikiData</Text>
            </Stack>
          </Link>
        )}

        {facebook_id && (
          <Link
            href={`https://www.facebook.com/${facebook_id}`}
            target="_blank"
            rel="noopener noreferrer">
            <Stack align="center">
              <Icon as={FaFacebook} fontSize="2xl" color="teal.600" />
              <Text fontSize="lg">Facebook</Text>
            </Stack>
          </Link>
        )}

        {twitter_id && (
          <Link
            href={`https://www.twitter.com/${twitter_id}`}
            target="_blank"
            rel="noopener noreferrer">
            <Stack align="center">
              <Icon as={FaTwitter} fontSize="2xl" color="teal.600" />
              <Text fontSize="lg">Twitter</Text>
            </Stack>
          </Link>
        )}

        {instagram_id && (
          <Link
            href={`https://www.instagram.com/${instagram_id}`}
            target="_blank"
            rel="noopener noreferrer">
            <Stack align="center">
              <Icon as={FaInstagram} fontSize="2xl" color="teal.600" />
              <Text fontSize="lg">Instagram</Text>
            </Stack>
          </Link>
        )}
      </HStack>
    </Box>
  );
};

export default MovieExternalIds;
