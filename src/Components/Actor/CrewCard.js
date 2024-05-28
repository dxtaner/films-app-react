import React from "react";
import { Box, Image, Text, Badge, VStack, Tooltip } from "@chakra-ui/react";

const CrewCard = ({ credit }) => {
  const {
    name,
    job,
    department,
    original_name,
    vote_average,
    popularity,
    poster_path,
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
          Yayın Tarihi: {first_air_date}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Oy Ortalaması: {vote_average.toFixed(1)}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Popülerlik: {popularity}
        </Text>
        <Tooltip label={`Job: ${job}`}>
          <Badge colorScheme="blue" cursor="pointer">
            {job}
          </Badge>
        </Tooltip>
        <Tooltip label={`Department: ${department}`}>
          <Badge colorScheme="green" cursor="pointer">
            {department}
          </Badge>
        </Tooltip>
      </VStack>
    </Box>
  );
};

export default CrewCard;
