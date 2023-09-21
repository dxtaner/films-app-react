import React from "react";
import { Box, Heading, Text, Link } from "@chakra-ui/react";

const MovieExternalIds = ({ movieExternalIds }) => {
  const externalLinks = [
    { name: "IMDb", id: "imdb_id" },
    { name: "WikiData", id: "wikidata_id" },
    { name: "Facebook", id: "facebook_id" },
    { name: "Twitter", id: "twitter_id" },
    { name: "Instagram", id: "instagram_id" },
  ];

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
      {externalLinks.map((link) => {
        const id = link.id;
        const url = movieExternalIds[id];

        if (url) {
          return (
            <Text key={id} fontSize="lg" mb={2}>
              {link.name} bilgileri için tıklayın:{" "}
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                color="teal.600"
                textDecoration="underline">
                {link.name}
              </Link>
            </Text>
          );
        }

        return null;
      })}
    </Box>
  );
};

export default MovieExternalIds;
