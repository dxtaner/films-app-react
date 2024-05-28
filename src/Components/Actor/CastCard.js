import React from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
  Tooltip,
} from "@chakra-ui/react";

const CastCard = ({ credit }) => {
  const {
    character,
    name,
    poster_path,
    original_name,
    vote_average,
    popularity,
    first_air_date,
  } = credit;

  return (
    <Box
      p={4}
      bg="gray.50"
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
      mx="auto"
      maxWidth="300px">
      <Image
        src={`https://image.tmdb.org/t/p/w200${poster_path}`}
        alt={name}
        borderRadius="lg"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/250"
        transition="transform 0.3s"
        _hover={{ transform: "scale(1.05)" }}
      />
      <VStack align="start" spacing={2} mt={4}>
        <Text fontWeight="bold" fontSize="xl" cursor="pointer">
          {name}
        </Text>
        <Text fontSize="md" color="gray.600">
          {original_name}
        </Text>
        <Text fontSize="sm" color="gray.500">
          İlk Yayın Tarihi: {first_air_date}{" "}
        </Text>

        <Text fontSize="sm" color="gray.500">
          Oy Ortalaması: {vote_average.toFixed(1)}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Popülerlik: {popularity}
        </Text>

        <HStack spacing={2}>
          <Tooltip label={`Character: ${character}`}>
            <Badge colorScheme="blue" cursor="pointer">
              {character}
            </Badge>
          </Tooltip>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CastCard;
