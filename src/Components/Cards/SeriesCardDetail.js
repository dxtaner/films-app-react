import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";

const YOUR_API_KEY = process.env.REACT_APP_APIKEY;

const SeriesCard = ({ series }) => {
  const {
    name,
    genre_ids,
    first_air_date,
    overview,
    backdrop_path,
    vote_average,
    vote_count,
    origin_country,
    popularity,
  } = series;

  const [genreData, setGenreData] = useState({});

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/tv/list",
          {
            params: {
              api_key: YOUR_API_KEY,
              language: "tr-US",
            },
          }
        );
        const genres = {};
        response.data.genres.forEach((genre) => {
          genres[genre.id] = genre.name;
        });
        setGenreData(genres);
      } catch (error) {
        console.error("Genre data fetch error:", error);
      }
    };

    fetchGenreData();
  }, []);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{
        transform: "scale(1.02)",
        shadow: "xl",
      }}
      bg="gray.100">
      <Image
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt={name}
        w="100%"
        h={44}
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h2" size="md" mb={2} color="blackAlpha.800">
          {name}
        </Heading>
        <Text fontSize="sm" mb={2} color="gray.600">
          {first_air_date}
        </Text>
        <Flex flexWrap="wrap" mb={2}>
          {genre_ids.map((genreId) => (
            <Badge
              key={genreId}
              colorScheme="green"
              ml={1}
              mb={1}
              variant="outline">
              {genreData[genreId]}
            </Badge>
          ))}
        </Flex>
        <Text fontSize="sm" mb={2} color="gray.600">
          Ana Ülke: {origin_country}
        </Text>
        <Text fontSize="sm" mb={2} color="gray.600">
          Popülerlik: {popularity.toFixed(2)}
        </Text>
        <Text fontSize="sm" mb={2} color="gray.600">
          {overview}
        </Text>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap">
          <Tooltip label={`Vote Average: ${vote_average}`} m={2}>
            <Badge colorScheme="blue" variant="solid" m={2}>
              Oy Oranı: {vote_average}
            </Badge>
          </Tooltip>
          <Tooltip label={`Vote Count: ${vote_count}`} m={2}>
            <Badge colorScheme="orange" variant="solid" m={2}>
              Oy Sayısı: {vote_count}
            </Badge>
          </Tooltip>
        </Flex>
      </Box>
    </Box>
  );
};

export default SeriesCard;
