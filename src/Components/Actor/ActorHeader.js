import React from "react";
import { Box, Image, Text, Badge } from "@chakra-ui/react";

const ActorHeader = ({ person, movieCreditsLength }) => {
  const {
    name,
    birthday,
    place_of_birth,
    gender,
    known_for_department,
    popularity,
    profile_path,
  } = person;

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
      mb={8}
      p={2}
      borderRadius="lg"
      bg="gray.100"
      boxShadow="md">
      {profile_path && (
        <Image
          boxSize="200px"
          borderRadius="full"
          src={`https://image.tmdb.org/t/p/w500${profile_path}`}
          alt={`${name} profile`}
          mr={6}
          boxShadow="lg"
        />
      )}
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          {name}
        </Text>
        <Box display="flex" alignItems="center" mb={2}>
          <Badge colorScheme="teal" variant="solid" fontSize="sm" mr={2}>
            {calculateAge(birthday)} Yaş
          </Badge>
          <Text fontSize="sm" color="gray.600">
            {gender === 2 ? "Erkek" : "Kadın"} - {place_of_birth}
          </Text>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Badge colorScheme="purple" variant="solid" fontSize="sm" mr={2}>
            Popülerlik:
          </Badge>
          <Text fontSize="sm" color="gray.600">
            {popularity.toFixed(2)}
          </Text>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Badge colorScheme="green" variant="solid" fontSize="sm" mr={2}>
            Departman:
          </Badge>
          <Text fontSize="sm" color="gray.600">
            {known_for_department}
          </Text>
        </Box>
        <Box display="flex" alignItems="center">
          <Badge colorScheme="orange" variant="solid" fontSize="sm" mr={2}>
            Rol Sayısı:
          </Badge>
          <Text fontSize="sm" color="gray.600">
            {movieCreditsLength}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ActorHeader;
