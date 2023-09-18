import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPersonInfo,
  selectPerson,
  selectPersonStatus,
} from "../../app/features/actors/personSlice.js";
import {
  Box,
  Heading,
  Text,
  Spinner,
  VStack,
  Image,
  HStack,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  fetchPersonMovieCredits,
  selectPersonMovieCredits,
} from "../../app/features/actors/personMoviesSlice.js";
import { useLocation } from "react-router-dom";
import PersonCredits from "./PersonCredits.js";
import {
  FaFacebook,
  FaFemale,
  FaImdb,
  FaInstagram,
  FaMale,
  FaTwitter,
  FaWikipediaW,
} from "react-icons/fa";
import {
  fetchPersonExternalIds, // Dış kimlik bilgilerini alma işlemi
  selectPersonExternalIds, // Dış kimlik bilgilerini seçmek için selektör
} from "../../app/features/actors/personExternalIdsSlice.js"; // Yeni eklenen dış kimlik bilgileri slice'ı

const ActorDetails = () => {
  const dispatch = useDispatch();
  const person = useSelector(selectPerson);
  const status = useSelector(selectPersonStatus);
  const movieCredits = useSelector(selectPersonMovieCredits);
  const externalIds = useSelector(selectPersonExternalIds); // Dış kimlik bilgilerini seçmek
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchPersonInfo(location.state.id));
    dispatch(fetchPersonMovieCredits(location.state.id));
    dispatch(fetchPersonExternalIds(location.state.id)); // Dış kimlik bilgilerini alma işlemi
  }, [dispatch, location.state.id]);

  if (status === "loading") {
    return (
      <VStack spacing={4} align="center">
        <Spinner size="xl" color="teal.500" />
        <Text>Loading...</Text>
      </VStack>
    );
  }

  if (status === "failed") {
    return (
      <Box>
        <Text fontSize="xl" color="red.500">
          Failed to load actor details.
        </Text>
      </Box>
    );
  }

  if (!person) {
    return null;
  }

  function calculateAge(birthDate) {
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  }

  const totalMovieCount = movieCredits.length; // Toplam rol aldığı filmlerin sayısı

  return (
    <Box
      p={3}
      m={2}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      borderColor="teal.300"
      bgColor="white">
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
                Department: {person.known_for_department}
              </Badge>
            )}
          </Flex>

          <Text fontSize="lg" m={2}>
            <strong>Toplam Rol Aldığı Filmler:</strong> {totalMovieCount}
          </Text>
        </Box>
      </HStack>
      <Text fontSize="lg" mt={4}>
        <strong>Biyografi:</strong> {person.biography}
      </Text>

      <Flex alignItems="center" mt={2} mb={2}>
        <strong>Sosyal Kimlik Bilgileri:</strong>
        <ul
          style={{
            listStyleType: "none",
            paddingInlineStart: 0,
            display: "flex",
            gap: "10px",
            margin: "5px",
          }}>
          {externalIds && externalIds.imdb_id && (
            <li>
              <a
                href={`https://www.imdb.com/name/${externalIds.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#333" }}>
                <Icon as={FaImdb} boxSize={5} /> IMDB
              </a>
            </li>
          )}
          {externalIds && externalIds.wikipedia_id && (
            <li>
              <a
                href={`https://www.wikipedia.org/wiki/${externalIds.wikipedia_id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#333" }}>
                <Icon as={FaWikipediaW} boxSize={5} /> Wikipedia
              </a>
            </li>
          )}
          {externalIds && externalIds.facebook_id && (
            <li>
              <a
                href={`https://www.facebook.com/${externalIds.facebook_id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#333" }}>
                <Icon as={FaFacebook} boxSize={5} /> Facebook
              </a>
            </li>
          )}
          {externalIds && externalIds.twitter_id && (
            <li>
              <a
                href={`https://twitter.com/${externalIds.twitter_id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#333" }}>
                <Icon as={FaTwitter} boxSize={5} /> Twitter
              </a>
            </li>
          )}
          {externalIds && externalIds.instagram_id && (
            <li>
              <a
                href={`https://www.instagram.com/${externalIds.instagram_id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#333" }}>
                <Icon as={FaInstagram} boxSize={5} /> Instagram
              </a>
            </li>
          )}
        </ul>
      </Flex>

      <PersonCredits movieCredits={movieCredits} />
    </Box>
  );
};

export default ActorDetails;
