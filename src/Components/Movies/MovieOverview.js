import React from "react";
import { Box, Text, VStack, Divider, Badge, Flex } from "@chakra-ui/react";

const MovieOverview = ({ movieDetails }) => {
  if (!movieDetails) {
    return null;
  }

  const {
    original_title,
    overview,
    popularity,
    release_date,
    runtime,
    vote_average,
    vote_count,
    production_countries,
    spoken_languages,
  } = movieDetails;

  const formattedProductionCountries = production_countries
    .map((country) => country.name)
    .join(", ");

  const formattedSpokenLanguages = spoken_languages
    .map((language) => language.english_name)
    .join(", ");

  // Dakikayı saate çevirme
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const formattedRuntime = `${hours} saat ${minutes} dakika`;

  return (
    <Box
      p={6}
      boxShadow="md"
      borderRadius="lg"
      bg="white"
      maxW="800px"
      mx="auto"
      borderWidth={2}
      borderColor="gray.300"
      textAlign="left">
      <Flex align="center" justify="space-between" mb={4}>
        <Box>
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">
            {original_title}
          </Text>
          <Badge colorScheme="teal" mt={2}>
            Popülerlik: {popularity.toFixed(2)}
          </Badge>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Vizyon Tarihi: {release_date}
          </Text>
        </Box>
      </Flex>

      <Text fontSize="lg" mb={4}>
        {overview}
      </Text>

      <Divider my={4} />

      <VStack spacing={4} align="left">
        <Flex justify="space-between" w="100%">
          <Text fontWeight="bold">Süre:</Text>
          <Text>{formattedRuntime}</Text>
        </Flex>
        <Flex justify="space-between" w="100%">
          <Text fontWeight="bold">Oy Ortalaması:</Text>
          <Text>{vote_average.toFixed(2)}</Text>
        </Flex>
        <Flex justify="space-between" w="100%">
          <Text fontWeight="bold">Oy Sayısı:</Text>
          <Text>{vote_count}</Text>
        </Flex>
        <Flex justify="space-between" w="100%">
          <Text fontWeight="bold">Üretim Ülkeleri:</Text>
          <Badge p={3}>{formattedProductionCountries}</Badge>
        </Flex>
        <Flex justify="space-between" w="100%">
          <Text fontWeight="bold">Konuşulan Diller:</Text>
          <Badge p={3}>{formattedSpokenLanguages}</Badge>
        </Flex>
      </VStack>
    </Box>
  );
};

export default MovieOverview;
