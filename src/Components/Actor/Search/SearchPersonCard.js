import React, { useState } from "react";
import { Box, Image, Text, Badge, Flex, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SearchPersonCard = ({ person }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/original${person.profile_path}`
    : null;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="ease-in-out 0.2s"
      _hover={{
        boxShadow: "lg",
        transform: "scale(1.02)",
      }}
      width="100%"
      maxWidth="250px"
      margin="auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      marginBottom="4">
      <RouterLink to={`/ActorDetails/${person.id}`}>
        <Box position="relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={person.name}
              borderRadius="lg"
              objectFit="cover"
              width="100%"
              minHeight="200px"
            />
          ) : (
            <Box
              minHeight="300px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              backgroundColor="gray.200">
              <Text fontSize="lg" fontWeight="bold" color="gray.600">
                Resim Yok
              </Text>
            </Box>
          )}
          {isHovered && (
            <Box
              position="absolute"
              bottom="0"
              left="0"
              top="0"
              right="0"
              bg="rgba(0, 0, 0, 0.7)"
              color="white"
              p={4}
              textAlign="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              transition="background-color 0.3s ease-in-out"
              opacity={1}
              _hover={{
                bg: "rgba(0, 0, 0, 0.8)",
              }}>
              <Text fontSize="lg" fontWeight="bold">
                {person.name}
              </Text>
              <Flex justifyContent="center" alignItems="center" mt={2}>
                {person.gender === 1 ? (
                  <Badge colorScheme="pink" mr={2}>
                    Kadın
                  </Badge>
                ) : person.gender === 2 ? (
                  <Badge colorScheme="blue" mr={2}>
                    Erkek
                  </Badge>
                ) : null}
                <Text>{person.popularity.toFixed(1)}</Text>
              </Flex>
              <VStack mt={2} spacing={1}>
                {person.known_for &&
                  person.known_for.map((item, index) => (
                    <Text fontSize="md" key={index} textAlign="center">
                      {item.original_title || item.original_name}
                    </Text>
                  ))}
              </VStack>
            </Box>
          )}
        </Box>
      </RouterLink>
    </Box>
  );
};

export default SearchPersonCard;
