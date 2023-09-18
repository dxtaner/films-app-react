import React from "react";
import {
  Box,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";

const MovieDetails = ({ movieDetails, isAuth, handleFavoriteClick }) => {
  const backdropPath = movieDetails.backdrop_path || "";
  const imageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
  if (!movieDetails) {
    return (
      <VStack
        p={[4, 4, 6, 6]}
        fontSize={["md", "lg", "xl", "2xl"]}
        textAlign="center"
        maxW="1800px"
        mx="auto"
        alignItems="stretch">
        <Text fontSize="xl">Film bilgileri yükleniyor...</Text>
      </VStack>
    );
  }

  return (
    <VStack
      p={[4, 4, 6, 6]}
      fontSize={["md", "lg", "xl", "2xl"]}
      textAlign="center"
      maxW="1800px" // Genişliği artırabiliriz
      mx="auto"
      alignItems="stretch" // Metinlerin genişliği eşit olsun
    >
      <Box
        cursor="pointer"
        w="100%"
        maxW="800px"
        mx="auto"
        m={2}
        borderRadius="lg"
        overflow="hidden"
        transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "lg",
        }}
        borderWidth="1px"
        borderColor="gray.200">
        <Image
          src={imageUrl}
          alt={movieDetails.original_title}
          w="100%"
          h="auto"
          objectFit="cover"
          objectPosition="center top"
        />
      </Box>

      <HStack spacing={2} mt={4} justifyContent="center">
        {movieDetails?.genres?.map((gen, index) => (
          <Tag
            key={index}
            colorScheme="red"
            bg="gray.300"
            borderRadius="lg"
            p={2}
            fontSize="sm" // Daha küçük yazı boyutu
            fontWeight="bold" // Kalın yazı tipi
          >
            {gen.name}
          </Tag>
        ))}
      </HStack>

      <Box
        p={6}
        boxShadow="lg"
        borderRadius="lg"
        bg="white"
        maxW="800px"
        mx="auto"
        borderWidth={1}
        borderColor="gray.200"
        textAlign="center"
        fontSize={["lg", "xl", "2xl", "3xl"]}
        lineHeight="taller"
        color="teal.600">
        <Heading fontSize="2xl" mb={4}>
          {movieDetails.original_title}
        </Heading>

        <Text fontSize="lg" mb={4}>
          {movieDetails.overview}
        </Text>

        <HStack spacing={4} justifyContent="center">
          <Text fontSize="md">
            <strong>Beğeni Sayısı:</strong> {movieDetails.vote_count}
          </Text>
          {movieDetails.vote_average != null && (
            <Text fontSize="md">
              <strong>Oy Ortalaması:</strong>{" "}
              {movieDetails.vote_average.toFixed(2)}
            </Text>
          )}
        </HStack>

        <HStack spacing={4} mt={4} justifyContent="center">
          <Text fontSize="md">
            <strong>Çıkış Tarihi:</strong> {movieDetails.release_date}
          </Text>
        </HStack>
      </Box>

      {isAuth && (
        <Button
          leftIcon={<AiOutlineHeart />}
          colorScheme="red"
          size="lg"
          onClick={handleFavoriteClick}
          width="100%"
          borderRadius="md"
          _hover={{
            bgColor: "red.600",
            color: "white",
          }}>
          Favori Filmlere Ekle
        </Button>
      )}
    </VStack>
  );
};

export default MovieDetails;
