import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  Flex,
  VStack,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const SearchPersonCard = ({ person }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
    : null;

  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      bg="gray.800"
      border="1px solid"
      borderColor="gray.700"
      boxShadow="lg"
      transition="all 0.3s cubic-bezier(.25,.8,.25,1)"
      _hover={{
        transform: "translateY(-6px)",
        borderColor: "red.600",
        boxShadow: "0 12px 24px -10px rgba(229, 62, 62, 0.3)",
      }}
      width="100%"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RouterLink to={`/ActorDetails/${person.id}`}>
        <Box position="relative" h="320px" bg="gray.900">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={person.name}
              objectFit="cover"
              width="100%"
              height="100%"
            />
          ) : (
            <Flex
              height="100%"
              alignItems="center"
              justifyContent="center"
              bg="gray.800"
              color="gray.500"
            >
              <Text fontSize="sm" fontWeight="semibold">
                Görsel Yok
              </Text>
            </Flex>
          )}

          {/* Statik isim altlığı (Kart hover edilmediğinde görünür) */}
          {!isHovered && (
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              p={3}
              bgGradient="linear(to-t, gray.900 90%, transparent)"
            >
              <Text fontSize="md" fontWeight="bold" color="white" noOfLines={1}>
                {person.name}
              </Text>
              {person.known_for_department && (
                <Text fontSize="xs" color="gray.400">
                  {person.known_for_department}
                </Text>
              )}
            </Box>
          )}

          {/* Hover Katmanı */}
          {isHovered && (
            <Box
              position="absolute"
              inset={0}
              bg="rgba(15, 23, 42, 0.92)"
              color="white"
              p={4}
              textAlign="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              transition="all 0.2s ease-in-out"
              backdropFilter="blur(2px)"
            >
              <Text fontSize="lg" fontWeight="extrabold" color="white" mb={1}>
                {person.name}
              </Text>

              <Flex justifyContent="center" alignItems="center" gap={2} mb={3}>
                {person.gender === 1 ? (
                  <Badge colorScheme="pink" variant="subtle" fontSize="10px">
                    Kadın
                  </Badge>
                ) : person.gender === 2 ? (
                  <Badge colorScheme="blue" variant="subtle" fontSize="10px">
                    Erkek
                  </Badge>
                ) : null}

                {person.popularity && (
                  <HStack
                    spacing={1}
                    color="yellow.400"
                    fontSize="xs"
                    fontWeight="bold"
                  >
                    <Icon as={FaStar} />
                    <Text>{person.popularity.toFixed(1)}</Text>
                  </HStack>
                )}
              </Flex>

              {person.known_for && person.known_for.length > 0 && (
                <VStack spacing={1} w="100%">
                  <Text
                    fontSize="xs"
                    color="gray.400"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    Bilinen Yapımları
                  </Text>
                  {person.known_for.slice(0, 3).map((item, index) => (
                    <Text
                      fontSize="xs"
                      color="gray.200"
                      key={index}
                      noOfLines={1}
                      w="100%"
                    >
                      •{" "}
                      {item.title ||
                        item.name ||
                        item.original_title ||
                        item.original_name}
                    </Text>
                  ))}
                </VStack>
              )}
            </Box>
          )}
        </Box>
      </RouterLink>
    </Box>
  );
};

export default SearchPersonCard;
