import React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Badge,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { detailsList } from "../../app/features/movies/details/detailsSlice";

const MovieOverview = () => {
  const movieDetails = useSelector(detailsList);

  if (!movieDetails) {
    return (
      <Box p={8} borderRadius="lg" bg="white" boxShadow="xl" textAlign="center">
        <Text fontSize="xl" color="gray.500">
          Film detayları bulunamadı.
        </Text>
      </Box>
    );
  }

  const {
    id,
    title,
    original_title,
    overview,
    release_date,
    runtime,
    vote_average,
    vote_count,
    budget,
    revenue,
    belongs_to_collection,
    production_companies = [],
    production_countries = [],
    spoken_languages = [],
    tagline,
  } = movieDetails;

  const hours = Math.floor((runtime || 0) / 60);
  const minutes = (runtime || 0) % 60;
  const runtimeText = `${hours} saat ${minutes} dakika`;

  return (
    <Box
      p={8}
      borderRadius="lg"
      bg="white"
      borderWidth={1}
      borderColor="gray.200"
      textAlign="left"
      boxShadow="xl"
    >
      <Heading as="h2" size="xl" mb={2}>
        {title} ({release_date ? release_date.substring(0, 4) : "Tarih Yok"})
      </Heading>

      {tagline && (
        <Text fontSize="md" fontStyle="italic" color="gray.500" mb={4}>
          "{tagline}"
        </Text>
      )}

      <VStack spacing={4} align="start">
        {original_title && (
          <Text fontSize="md">
            <strong>Orijinal Başlık:</strong> {original_title}
          </Text>
        )}
        {overview && (
          <Text fontSize="md" color="gray.700">
            <strong>Özet:</strong> {overview}
          </Text>
        )}

        <HStack spacing={3} wrap="wrap" my={2}>
          {runtime > 0 && (
            <Badge colorScheme="teal" variant="solid" p={1}>
              Süre: {runtimeText}
            </Badge>
          )}
          {budget > 0 && (
            <Badge colorScheme="green" variant="solid" p={1}>
              Bütçe: ${budget.toLocaleString()}
            </Badge>
          )}
          {revenue > 0 && (
            <Badge colorScheme="purple" variant="solid" p={1}>
              Gelir: ${revenue.toLocaleString()}
            </Badge>
          )}
          {vote_average > 0 && (
            <Badge colorScheme="orange" variant="solid" p={1}>
              Puan: {vote_average.toFixed(1)} ({vote_count} oy)
            </Badge>
          )}
        </HStack>

        {belongs_to_collection && (
          <Box my={2}>
            <ChakraLink
              as={Link}
              to={`/MovieDetails/${id}/Collection/${belongs_to_collection.id}`}
              color="teal.500"
              fontWeight="bold"
            >
              Koleksiyon: {belongs_to_collection.name}
            </ChakraLink>
          </Box>
        )}

        {production_companies.length > 0 && (
          <Text fontSize="sm" color="gray.600">
            <strong>Yapım Şirketleri:</strong>{" "}
            {production_companies.map((c) => c.name).join(", ")}
          </Text>
        )}
        {production_countries.length > 0 && (
          <Text fontSize="sm" color="gray.600">
            <strong>Ülkeler:</strong>{" "}
            {production_countries.map((c) => c.name).join(", ")}
          </Text>
        )}
        {spoken_languages.length > 0 && (
          <Text fontSize="sm" color="gray.600">
            <strong>Diller:</strong>{" "}
            {spoken_languages.map((l) => l.name).join(", ")}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default MovieOverview;
