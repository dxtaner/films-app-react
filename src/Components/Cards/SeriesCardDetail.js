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
    popularity, // popularity ekledik
  } = series;

  const [genreData, setGenreData] = useState({});

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/genre/tv/list", {
        params: {
          api_key: YOUR_API_KEY,
          language: "tr-US",
        },
      })
      .then((response) => {
        const genres = {};
        response.data.genres.forEach((genre) => {
          genres[genre.id] = genre.name;
        });
        setGenreData(genres);
      })
      .catch((error) => {
        console.error("Genre data fetch error:", error);
      });
  }, []);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md">
      <Image
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt={name}
        w="100%"
        h={44}
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h2" size="md" mb={2}>
          {name}
        </Heading>
        <Text fontSize="sm" mb={2}>
          {first_air_date}
        </Text>
        <Text fontSize="sm" mb={2}>
          {genre_ids.map((genreId) => (
            <Badge key={genreId} colorScheme="green" ml={1}>
              {genreData[genreId]}
            </Badge>
          ))}
        </Text>
        <Text fontSize="sm" mb={2}>
          Ana Ülke: {origin_country}
        </Text>
        <Text fontSize="sm" mb={2}>
          Popületisi: {popularity.toFixed(2)}
        </Text>
        <Text fontSize="sm" mb={2}>
          {overview.length > 150
            ? `${overview.substring(0, 150)}...`
            : overview}
        </Text>

        <Flex justifyContent="space-between" alignItems="center">
          <Tooltip label={`Vote Average: ${vote_average}`}>
            <Badge colorScheme="blue">Oy Oranı: {vote_average}</Badge>
          </Tooltip>
          <Tooltip label={`Vote Count: ${vote_count}`}>
            <Badge colorScheme="orange">Oy Sayısı: {vote_count}</Badge>
          </Tooltip>
        </Flex>
      </Box>
    </Box>
  );
};

export default SeriesCard;
