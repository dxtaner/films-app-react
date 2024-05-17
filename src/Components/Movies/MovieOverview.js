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
    ? production_countries.map((country) => country.name).join(", ")
    : "";

  const formattedSpokenLanguages = spoken_languages
    ? spoken_languages.map((language) => language.english_name).join(", ")
    : "";

  const formattedRuntime = runtime
    ? `${Math.floor(runtime / 60)} saat ${runtime % 60} dakika`
    : "";

  return (
    <Box
      p={6}
      borderRadius="lg"
      bg="gray.100"
      mx="auto"
      borderWidth={2}
      borderColor="gray.300"
      textAlign="left">
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={4}>
        {original_title}
      </Text>

      <Flex justify="space-between" align="center" flexWrap="wrap" mb={4}>
        <Badge colorScheme="teal" mb={2}>
          Popülerlik: {popularity ? popularity.toFixed(2) : ""}
        </Badge>
        <Text fontWeight="bold" mb={2}>
          Vizyon Tarihi: {release_date ? release_date : ""}
        </Text>
      </Flex>

      <Text fontSize="lg" mb={4}>
        {overview}
      </Text>

      <Divider my={4} />

      <VStack spacing={4} align="left">
        <Flex justify="space-between" p={1} w="100%" mb={2} wrap={"wrap"}>
          <Text fontWeight="bold">Süre:</Text>
          <Text>{formattedRuntime}</Text>
        </Flex>

        <Flex justify="space-between" p={1} w="100%" mb={2} wrap={"wrap"}>
          <Text fontWeight="bold">Oy Ortalaması:</Text>
          <Text>{vote_average ? vote_average.toFixed(2) : ""}</Text>
        </Flex>

        <Flex justify="space-between" p={1} w="100%" mb={2} wrap={"wrap"}>
          <Text fontWeight="bold">Oy Sayısı:</Text>
          <Text>{vote_count ? vote_count : ""}</Text>
        </Flex>

        <Flex justify="space-between" p={1} w="100%" mb={2} wrap={"wrap"}>
          <Text fontWeight="bold">Üretim Ülkeleri:</Text>
          <Badge colorScheme="red" m={1} p={2}>
            {formattedProductionCountries}
          </Badge>
        </Flex>

        <Flex justify="space-between" p={1} w="100%" mb={2} wrap={"wrap"}>
          <Text fontWeight="bold">Konuşulan Diller:</Text>
          <Badge colorScheme="red" m={1} p={2}>
            {formattedSpokenLanguages}
          </Badge>
        </Flex>
      </VStack>
    </Box>
  );
};

export default MovieOverview;
