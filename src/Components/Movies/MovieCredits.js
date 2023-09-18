import React, { useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Badge,
  Text,
  Button,
  Image,
  VStack,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const MovieCredits = ({ credits }) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleCredits = credits.slice(startIndex, endIndex);
  const totalPages = Math.ceil(credits.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const showDetails = (person) => {
    navigate(`/actorDetails/${person.id}`, { state: person });
  };

  return (
    <Box
      p={[1, 1, 3, 3]}
      fontSize={["sm", "md", "lg", "xl"]}
      textAlign="center"
      maxW="800px"
      mx="auto">
      <Heading fontSize="2xl" mb={4}>
        Oyuncu Bilgileri
      </Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} justifyItems="center">
        {visibleCredits.map((credit, index) => (
          <Box
            key={index}
            textAlign="center"
            boxShadow="lg"
            borderRadius="lg"
            bg="gray.200"
            p={4}
            maxW="200px"
            flexBasis="200px"
            cursor="pointer"
            onClick={() => showDetails(credit)}>
            <Image
              src={`https://image.tmdb.org/t/p/original${credit.profile_path}`}
              alt={credit.name}
              borderRadius="full"
              boxSize="150px"
              mx="auto"
            />
            <VStack spacing={4}>
              <Heading fontSize="xl" mt={4}>
                {credit.name}
              </Heading>

              <Text
                fontSize="md"
                mt={2}
                fontWeight="semibold" // Metin kalınlaştırma
                color="gray.700" // Metin rengi
              >
                Karakter: {credit.character}
              </Text>

              <Badge colorScheme="blue" fontSize="sm" mt={2}>
                Popülerlik: {credit.popularity}
              </Badge>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
      <Box mt={4}>
        <Button
          colorScheme="pink"
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          leftIcon={<ArrowBackIcon />}
          bg="pink.500"
          _hover={{ bg: "pink.600" }}
          _active={{ bg: "pink.700" }}>
          Önceki Sayfadaki Oyuncular
        </Button>
        <Button
          colorScheme="green"
          onClick={() => handlePageChange(currentPage + 1)}
          ml={2}
          isDisabled={currentPage === totalPages}
          rightIcon={<ArrowForwardIcon />}
          bg="green.500"
          _hover={{ bg: "green.600" }}
          _active={{ bg: "green.700" }}>
          Sonraki Sayfadaki Oyuncular
        </Button>
      </Box>
    </Box>
  );
};

export default MovieCredits;
