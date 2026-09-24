import React from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  VStack,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const CastCard = ({ credit }) => {
  const {
    character,
    name,
    poster_path,
    original_name,
    vote_average,
    first_air_date,
  } = credit;

  return (
    <Box
      p={4}
      bg="gray.800"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.700"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", borderColor: "red.500" }}
      display="flex"
      flexDirection="column"
      h="100%"
    >
      <Image
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w300${poster_path}`
            : "https://via.placeholder.com/300x450/1A202C/FFFFFF?text=Görsel+Yok"
        }
        alt={name}
        borderRadius="lg"
        objectFit="cover"
        h="240px"
        w="100%"
        mb={3}
      />
      <VStack align="start" spacing={1.5} flex="1" justify="space-between">
        <Box w="100%">
          <Text fontWeight="bold" fontSize="md" color="white" noOfLines={1}>
            {name}
          </Text>
          {original_name && (
            <Text fontSize="xs" color="gray.400" noOfLines={1} mb={1}>
              {original_name}
            </Text>
          )}
          {character && (
            <Badge
              colorScheme="red"
              variant="subtle"
              fontSize="xs"
              borderRadius="md"
              mb={2}
            >
              Rol: {character}
            </Badge>
          )}
        </Box>

        <HStack
          justify="space-between"
          w="100%"
          fontSize="xs"
          color="gray.400"
          pt={2}
          borderTop="1px solid"
          borderColor="gray.700"
        >
          <Text>{first_air_date ? first_air_date.split("-")[0] : "-"}</Text>
          <HStack spacing={1} color="yellow.400" fontWeight="bold">
            <Icon as={FaStar} />
            <Text>{vote_average ? vote_average.toFixed(1) : "N/A"}</Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CastCard;
