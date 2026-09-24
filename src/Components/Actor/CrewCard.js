import React from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const CrewCard = ({ credit }) => {
  const {
    name,
    job,
    department,
    original_name,
    vote_average,
    poster_path,
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
          <HStack wrap="wrap" gap={1} mb={2}>
            {job && (
              <Badge colorScheme="purple" fontSize="10px" borderRadius="md">
                {job}
              </Badge>
            )}
            {department && (
              <Badge colorScheme="gray" fontSize="10px" borderRadius="md">
                {department}
              </Badge>
            )}
          </HStack>
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

export default CrewCard;
