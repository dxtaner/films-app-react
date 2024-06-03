import React from "react";
import {
  Box,
  Image,
  VStack,
  Heading,
  Text,
  Badge,
  Tooltip,
} from "@chakra-ui/react";

const CastItem = ({ credit, showDetails }) => {
  return (
    <Tooltip label="Detayları görmek için tıklayın" fontSize="md">
      <Box
        textAlign="center"
        borderRadius="lg"
        bg="white"
        p={4}
        cursor="pointer"
        onClick={() => showDetails(credit)}
        transition="transform 0.3s ease-in-out"
        _hover={{ transform: "scale(1.03)" }}
        boxShadow="lg"
        maxW="300px"
        mx="auto">
        <Image
          src={
            credit.profile_path
              ? `https://image.tmdb.org/t/p/original${credit.profile_path}`
              : "https://via.placeholder.com/150"
          }
          alt={credit.name}
          borderRadius="full"
          boxSize="180px"
          mx="auto"
        />
        <VStack spacing={2} mt={4}>
          <Heading
            fontSize={["sm", "md", "lg", "xl", "2xl"]}
            fontWeight="semibold"
            color="gray.800">
            {credit.name}
          </Heading>
          {credit.character && (
            <Text
              fontSize={["xs", "sm", "md", "lg", "lg"]}
              fontWeight="semibold"
              color="gray.600">
              Karakter: {credit.character}
            </Text>
          )}
          <Text
            fontSize={["xs", "sm", "md", "lg", "lg"]}
            fontWeight="semibold"
            color="gray.600">
            Cinsiyet: {credit.gender === 1 ? "Kadın" : "Erkek"}
          </Text>
          <Badge
            colorScheme="teal"
            variant="solid"
            fontSize={["xs", "sm", "sm", "md", "md"]}>
            Popülerlik: {credit.popularity.toFixed(2)}
          </Badge>
        </VStack>
      </Box>
    </Tooltip>
  );
};

export default CastItem;
