import React, { useState } from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  Wrap,
  Flex,
  Button,
  Badge,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const itemsPerPage = 12;

const PersonCredits = ({ movieCredits }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const moviesToShow = movieCredits.slice(startIndex, endIndex);
  const totalPages = Math.ceil(movieCredits.length / itemsPerPage);

  const showDetails = (movie) => {
    navigate(`/movieDetails/${movie.id}`, { state: movie });
  };

  return (
    <Box mt={8}>
      <Heading as="h2" size="xl" mb={4}>
        Oyuncunun Rol Aldığı Filmler
      </Heading>
      <Wrap spacing={4} justify="center">
        {moviesToShow.map((credit) => (
          <Box
            key={credit.id}
            bg="gray.200"
            borderRadius="lg"
            p={4}
            maxW="200px"
            flexBasis="200px"
            cursor="pointer"
            onClick={() => showDetails(credit)}>
            <Image
              src={`https://image.tmdb.org/t/p/original${credit.poster_path}`}
              alt={credit.title}
              borderRadius="full"
              boxSize="150px"
              mx="auto"
            />
            <Heading fontSize="lg" mt={4}>
              {credit.title}
            </Heading>
            <Text fontSize="md" mt={2}>
              Karakter: {credit.character}
            </Text>
            <Badge colorScheme="teal" mt={2}>
              Popülerlik: {credit.popularity.toFixed(2)}
            </Badge>
            <Text fontSize="sm" mt={2}>
              Yayın Tarihi: {credit.release_date}
            </Text>
            <Badge colorScheme="purple" mt={2}>
              Orijinal Dil: {credit.original_language}
            </Badge>
            <Flex flexWrap="wrap" mt={2}>
              {credit.genre_ids.map((genreId) => (
                <Badge
                  key={genreId}
                  colorScheme="green"
                  bg="gray.300"
                  borderRadius="lg"
                  p={[1, 1, 2, 2]}
                  mr={2}
                  mb={2}>
                  Genre: {genreId}
                </Badge>
              ))}
            </Flex>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              mt={2}
              color="gray.600">
              <Text>
                Değerlendirme:{" "}
                <Badge colorScheme="blue">{credit.vote_average}</Badge>
                <br />
                Oy Sayısı:{" "}
                <Badge colorScheme="orange">{credit.vote_count}</Badge>
              </Text>
            </Flex>
          </Box>
        ))}
      </Wrap>
      <Flex justifyContent="center" alignItems="center" mt={4}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 0}
          mr={2}>
          Önceki
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index)}
            colorScheme={currentPage === index ? "teal" : "gray"}>
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages - 1}
          ml={2}>
          Sonraki
        </Button>
      </Flex>
    </Box>
  );
};

export default PersonCredits;
