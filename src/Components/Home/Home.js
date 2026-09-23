import React from "react";
import { Box, Container, Heading, VStack, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PopularMoviesCarousel from "../Movies/popularMoviesCarousel.js";
import TopRatedMovies from "../Movies/TopRatedMovies.js";

const Home = () => {
  const navigate = useNavigate();

  const showDetails = (item) => {
    navigate(`/details/${item.id}`, { state: item });
  };

  return (
    <Box bg="gray.950" color="white" minH="100vh">
      {/* Popüler Filmler - Tam Genişlikte Carousel */}
      <Box mb={12} position="relative" zIndex={1}>
        <PopularMoviesCarousel />
      </Box>

      {/* Ana İçerik Alanı */}
      <Container maxW="container.xl" pb={16}>
        <VStack spacing={12} align="stretch">
          <Box>
            <Flex align="center" gap={3} mb={6}>
              <Box h="10" w="2" bg="red.500" borderRadius="full" />
              <Heading as="h2" size="xl">
                En Yüksek Puan Alan Filmler
              </Heading>
            </Flex>

            {/* TopRatedMovies bileşeninin içindeki grid'i bu Container'a uygun hale getirdiğini varsayıyorum */}
            <TopRatedMovies handleDetails={showDetails} />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
