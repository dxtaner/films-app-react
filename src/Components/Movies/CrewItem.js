import React from "react";
import {
  Box,
  Image,
  VStack,
  Heading,
  Text,
  Badge,
  Tooltip,
  Flex,
} from "@chakra-ui/react";

const CrewItem = ({ credit, showDetails }) => {
  return (
    <Tooltip
      label="Detayları görmek için tıklayın"
      fontSize="sm"
      bg="gray.800"
      color="white"
    >
      <Box
        textAlign="center"
        borderRadius="xl"
        bg="gray.800"
        border="1px solid"
        borderColor="gray.700"
        p={5}
        cursor="pointer"
        onClick={() => showDetails(credit)}
        transition="all 0.3s cubic-bezier(.25,.8,.25,1)"
        _hover={{
          transform: "translateY(-4px)",
          borderColor: "red.600",
          boxShadow: "0 10px 20px -5px rgba(229, 62, 62, 0.3)",
        }}
        boxShadow="lg"
        maxW="280px"
        mx="auto"
      >
        <Box position="relative" boxSize="160px" mx="auto" mb={2}>
          {credit.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
              alt={credit.name}
              borderRadius="full"
              boxSize="100%"
              objectFit="cover"
              border="2px solid"
              borderColor="red.600"
            />
          ) : (
            <Flex
              boxSize="100%"
              borderRadius="full"
              bg="gray.700"
              align="center"
              justify="center"
              color="gray.400"
              fontSize="xs"
              border="2px solid"
              borderColor="gray.600"
            >
              Görsel Yok
            </Flex>
          )}
        </Box>
        <VStack spacing={2} mt={3}>
          <Heading fontSize="md" fontWeight="bold" color="white" noOfLines={1}>
            {credit.name}
          </Heading>
          {credit.job && (
            <Text fontSize="xs" fontWeight="medium" color="gray.400">
              Görev: {credit.job}
            </Text>
          )}
          <Badge
            colorScheme="red"
            variant="subtle"
            fontSize="xs"
            borderRadius="md"
            px={2}
            py={0.5}
          >
            Popülerlik: {credit.popularity ? credit.popularity.toFixed(1) : 0}
          </Badge>
        </VStack>
      </Box>
    </Tooltip>
  );
};

export default CrewItem;
