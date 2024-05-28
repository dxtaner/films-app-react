import React from "react";
import { Box, Image, Text, Badge, Flex, Center } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const ActorHeader = ({ person }) => {
  const {
    name,
    birthday,
    place_of_birth,
    gender,
    known_for_department,
    popularity,
    profile_path,
  } = person;

  const { credits } = useSelector((state) => state.personMovies);

  const movieCreditsLength = credits.cast.length;

  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
      mb={8}
      p={4}
      borderRadius="lg"
      bg="white"
      boxShadow="lg">
      {profile_path ? (
        <Center>
          <Image
            boxSize="220px"
            borderRadius="20px"
            src={`https://image.tmdb.org/t/p/w500${profile_path}`}
            alt={`${name} profile`}
            mb={{ base: 4, md: 0 }}
            boxShadow="lg"
          />
        </Center>
      ) : (
        <Center>
          <Box
            boxSize="220px"
            borderRadius="20px"
            bg="gray.200"
            mb={{ base: 4, md: 0 }}
            boxShadow="lg"
          />
        </Center>
      )}
      <Box ml={{ base: 0, md: 8 }}>
        <Text fontSize="3xl" fontWeight="bold" mb={2} color="teal.900">
          {name}
        </Text>
        <Flex alignItems="center" mb={2}>
          <Badge colorScheme="teal" variant="solid" fontSize="sm" mr={2}>
            {calculateAge(birthday)} Yaş
          </Badge>
          <Text fontSize="sm" color="gray.600">
            {gender === 2 ? "Erkek" : "Kadın"} - {place_of_birth}
          </Text>
        </Flex>
        <Flex alignItems="center" mb={2}>
          <Badge colorScheme="red" variant="solid" fontSize="sm" mr={2}>
            Doğum Tarihi:
          </Badge>
          <Text fontSize="sm" color="gray.600">
            {new Date(birthday).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </Flex>
        <Flex alignItems="center" mb={2}>
          <Badge colorScheme="purple" variant="solid" fontSize="sm" mr={2}>
            Popülerlik:
          </Badge>
          <Text fontSize="sm" color="gray.600">
            {popularity.toFixed(2)}
          </Text>
        </Flex>
        <Flex alignItems="center" mb={2}>
          <Badge colorScheme="green" variant="solid" fontSize="sm" mr={2}>
            Departman:
          </Badge>
          <Text fontSize="sm" color="gray.600">
            {known_for_department}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Badge colorScheme="orange" variant="solid" fontSize="sm" mr={2}>
            Rol Sayısı:
          </Badge>
          <Text fontSize="sm" color="gray.600">
            {movieCreditsLength}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default ActorHeader;
