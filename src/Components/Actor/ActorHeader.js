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

function ActorHeader({ person, movieCreditsLength }) {
  function calculateAge(birthDate) {
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  }

  return (
    <Box>
      <HStack spacing={2} alignItems="center">
        <Image
          src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
          alt={person.name}
          objectFit="cover"
          borderRadius="10px"
          boxShadow="lg"
          border="4px solid teal"
          maxW={"150px"}
          _hover={{
            transform: "scale(1.05)",
            transition: "transform 0.2s ease-in-out",
            cursor: "pointer",
          }}
          transition="border 0.2s ease-in-out"
        />

        <Box>
          <Heading as="h2" size="lg" mb={2}>
            {person.name}
          </Heading>
          <Text fontSize="md" m={1}>
            <strong>Doğum Tarihi:</strong> {person.birthday} (
            {calculateAge(person.birthday)} yaşında)
          </Text>

          <Text fontSize="md" m={1}>
            <strong>Doğum Yeri:</strong>{" "}
            <Badge
              colorScheme="blue"
              fontSize="sm"
              py={1}
              px={2}
              borderRadius="md">
              {person.place_of_birth}
            </Badge>
          </Text>

          <Text fontSize="md" m={1}>
            <strong>Popülerlik Derecesi:</strong>{" "}
            <Badge
              colorScheme={person.popularity >= 7 ? "green" : "red"}
              fontSize="sm"
              py={1}
              px={2}
              borderRadius="md">
              {person.popularity.toFixed(2)}
            </Badge>
          </Text>

          <Text fontSize="md" m={1}>
            <strong>Cinsiyet:</strong>{" "}
            {person.gender === 2 ? (
              <>
                <Badge colorScheme="blue" fontSize="sm">
                  Erkek
                </Badge>{" "}
                <Icon as={FaMale} boxSize={3} color="blue.500" />
              </>
            ) : (
              <>
                <Badge colorScheme="pink" fontSize="sm">
                  Kadın
                </Badge>{" "}
                <Icon as={FaFemale} boxSize={3} color="pink.500" />
              </>
            )}
          </Text>

          <Flex flexWrap="wrap" mt={1} m={1}>
            {person?.known_for_department && (
              <Badge
                colorScheme="green"
                bg="gray.300"
                borderRadius="lg"
                p={1}
                mr={1}
                mb={1}>
                Departman: {person.known_for_department}
              </Badge>
            )}
          </Flex>

          <Text fontSize="md" m={1}>
            <strong>Toplam Rol Aldığı Sayı:</strong> {movieCreditsLength}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}

export default ActorHeader;
