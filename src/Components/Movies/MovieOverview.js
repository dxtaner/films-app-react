import React, { useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Badge,
  Tooltip,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import {
  detailsList,
  getDetails,
} from "../../app/features/movies/details/detailsSlice";
import { useDispatch, useSelector } from "react-redux";

const MovieOverview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const movieDetails = useSelector(detailsList);
  if (!movieDetails) {
    return (
      <Box
        p={8}
        borderRadius="lg"
        bg="white"
        mx="auto"
        borderWidth={1}
        borderColor="gray.200"
        textAlign="left"
        boxShadow="xl">
        <Text fontSize="xl">Film detayları bulunamadı.</Text>
      </Box>
    );
  }

  const {
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
    production_companies,
    production_countries,
    spoken_languages,
    tagline,
  } = movieDetails;

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const runtimeText = `${hours} saat ${minutes} dakika`;

  return (
    <Box
      p={8}
      borderRadius="lg"
      bg="white"
      mx="auto"
      borderWidth={1}
      borderColor="gray.200"
      textAlign="left"
      boxShadow="xl">
      <Heading as="h2" size="xl" mb={4}>
        {title} (
        {release_date ? release_date.substring(0, 4) : "Yayınlanma Tarihi Yok"})
      </Heading>

      {tagline && (
        <Text fontSize="lg" fontStyle="italic" color="gray.600" mb={4}>
          {tagline}
        </Text>
      )}

      <VStack spacing={6} align="start" wrap="wrap">
        <Text fontSize="lg">
          <strong>Orijinal Başlık:</strong> {original_title}
        </Text>
        <Text fontSize="lg">
          <strong>Özet:</strong> {overview}
        </Text>

        <HStack spacing={4} wrap="wrap" mb={4}>
          <Tooltip label="Filmin süresi" aria-label="Runtime Tooltip">
            <Badge colorScheme="teal" variant="solid">
              Süre: {runtimeText}
            </Badge>
          </Tooltip>
          <Tooltip label="Filmin bütçesi" aria-label="Budget Tooltip">
            <Badge colorScheme="green" variant="solid">
              Bütçe:{" "}
              {budget ? `$${budget.toLocaleString()}` : "Bilgi mevcut değil"}
            </Badge>
          </Tooltip>
          <Tooltip
            label="Filmin elde ettiği gelir"
            aria-label="Revenue Tooltip">
            <Badge colorScheme="purple" variant="solid">
              Gelir:{" "}
              {revenue ? `$${revenue.toLocaleString()}` : "Bilgi mevcut değil"}
            </Badge>
          </Tooltip>
          <Tooltip
            label="Filmin oy ortalaması ve toplam oy sayısı"
            aria-label="Vote Average Tooltip">
            <Badge colorScheme="orange" variant="solid">
              Oy Ortalaması: {vote_average} ({vote_count} oy)
            </Badge>
          </Tooltip>
        </HStack>

        {belongs_to_collection && (
          <Box mb={2}>
            <ChakraLink
              as={Link}
              to={`/MovieDetails/${id}/Collection/${belongs_to_collection.id}`}
              color="teal.500"
              fontWeight="bold">
              {belongs_to_collection.name}
            </ChakraLink>
          </Box>
        )}

        <Text fontSize="lg">
          <strong>Yapım Şirketleri:</strong>{" "}
          {production_companies &&
            production_companies.map((company) => company.name).join(", ")}
        </Text>
        <Text fontSize="lg">
          <strong>Üretim Ülkeleri:</strong>{" "}
          {production_countries &&
            production_countries.map((country) => country.name).join(", ")}
        </Text>
        <Text fontSize="lg">
          <strong>Konuşulan Diller:</strong>{" "}
          {spoken_languages &&
            spoken_languages.map((language) => language.name).join(", ")}
        </Text>
      </VStack>
    </Box>
  );
};

export default MovieOverview;
