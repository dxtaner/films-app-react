// components/ActorHeader.js

import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  HStack,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaFemale, FaMale } from "react-icons/fa";

function ActorHeader({ person }) {
  function calculateAge(birthDate) {
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  }

  return (
    <Box>
      <HStack spacing={4} alignItems="center" justifyContent="start">
        <Image
          src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
          alt={person.name}
          objectFit="cover"
          borderRadius="10px"
          boxShadow="lg"
          border="4px solid teal"
          maxW={"200px"}
          _hover={{
            transform: "scale(1.05)",
            transition: "transform 0.2s ease-in-out",
            cursor: "pointer",
          }}
          transition="border 0.2s ease-in-out"
        />

        <Box>
          <Heading as="h2" size="xl" mb={4}>
            {person.name}
          </Heading>
          <Text fontSize="lg" m={2}>
            <strong>Doğum Tarihi:</strong> {person.birthday}
            {` (${calculateAge(person.birthday)} yaşında)`}
          </Text>

          <Text fontSize="lg" m={2}>
            <strong>Doğum Yeri:</strong>{" "}
            <Badge
              colorScheme="blue"
              fontSize="1rem"
              py={1}
              px={2}
              borderRadius="md">
              {person.place_of_birth}
            </Badge>
          </Text>

          <Text fontSize="lg" m={2}>
            <strong>Popülerlik Derecesi:</strong>{" "}
            <Badge
              colorScheme={person.popularity >= 7 ? "green" : "red"}
              fontSize="1rem"
              py={1}
              px={2}
              borderRadius="md">
              {person.popularity.toFixed(2)}
            </Badge>
          </Text>

          <Text fontSize="lg" m={2}>
            <strong>Cinsiyet:</strong>{" "}
            {person.gender === 2 ? (
              <>
                <Badge colorScheme="blue">Erkek</Badge>{" "}
                <Icon as={FaMale} boxSize={5} color="blue.500" />
              </>
            ) : (
              <>
                <Badge colorScheme="pink">Kadın</Badge>{" "}
                <Icon as={FaFemale} boxSize={5} color="pink.500" />
              </>
            )}
          </Text>

          <Flex flexWrap="wrap" mt={2} m={2}>
            {person?.known_for_department && (
              <Badge
                colorScheme="green"
                bg="gray.300"
                borderRadius="lg"
                p={[1, 1, 2, 2]}
                mr={2}
                mb={2}>
                Departman: {person.known_for_department}
              </Badge>
            )}
          </Flex>
        </Box>
      </HStack>
    </Box>
  );
}

export default ActorHeader;
