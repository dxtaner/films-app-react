import React from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  Flex,
  VStack,
  Center,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
  FaFilm,
  FaUser,
} from "react-icons/fa";

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
  const movieCreditsLength = credits?.cast?.length || 0;

  const calculateAge = (birthDateStr) => {
    if (!birthDateStr) return null;
    const today = new Date();
    const birthDate = new Date(birthDateStr);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(birthday);

  return (
    <Box
      display="flex"
      alignItems={{ base: "center", md: "flex-start" }}
      flexDirection={{ base: "column", md: "row" }}
      bg="gray.800"
      p={6}
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.700"
      boxShadow="lg"
      gap={8}
    >
      <Center flexShrink={0}>
        <Image
          w="220px"
          h="310px"
          borderRadius="xl"
          src={
            profile_path
              ? `https://image.tmdb.org/t/p/w500${profile_path}`
              : "https://via.placeholder.com/220x310/1A202C/FFFFFF?text=Profil+Yok"
          }
          alt={name}
          objectFit="cover"
          boxShadow="2xl"
        />
      </Center>

      <Box flex="1" w="100%">
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="extrabold"
          color="white"
          mb={3}
        >
          {name}
        </Text>

        <Flex wrap="wrap" gap={3} mb={6}>
          {age && (
            <Badge
              colorScheme="red"
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="md"
            >
              {age} Yaşında
            </Badge>
          )}
          <Badge
            bg="gray.700"
            color="gray.200"
            fontSize="sm"
            px={3}
            py={1}
            borderRadius="md"
          >
            {known_for_department || "Oyuncu"}
          </Badge>
          <Badge
            bg="yellow.500"
            color="black"
            fontSize="sm"
            px={3}
            py={1}
            borderRadius="md"
          >
            <HStack spacing={1}>
              <Icon as={FaStar} />
              <Text>{popularity ? popularity.toFixed(1) : "0"}</Text>
            </HStack>
          </Badge>
        </Flex>

        <VStack align="start" spacing={3} color="gray.300" fontSize="sm">
          {birthday && (
            <HStack spacing={2}>
              <Icon as={FaCalendarAlt} color="red.500" />
              <Text fontWeight="semibold" color="gray.400">
                Doğum Tarihi:
              </Text>
              <Text color="white">
                {new Date(birthday).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </HStack>
          )}

          {place_of_birth && (
            <HStack spacing={2}>
              <Icon as={FaMapMarkerAlt} color="red.500" />
              <Text fontWeight="semibold" color="gray.400">
                Doğum Yeri:
              </Text>
              <Text color="white">{place_of_birth}</Text>
            </HStack>
          )}

          <HStack spacing={2}>
            <Icon as={FaUser} color="red.500" />
            <Text fontWeight="semibold" color="gray.400">
              Cinsiyet:
            </Text>
            <Text color="white">
              {gender === 2 ? "Erkek" : gender === 1 ? "Kadın" : "Belirtilmedi"}
            </Text>
          </HStack>

          <HStack spacing={2}>
            <Icon as={FaFilm} color="red.500" />
            <Text fontWeight="semibold" color="gray.400">
              Rol Aldığı Film Sayısı:
            </Text>
            <Text color="white">{movieCreditsLength}</Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ActorHeader;
