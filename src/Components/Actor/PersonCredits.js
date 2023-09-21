import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  Wrap,
  Flex,
  Button,
  ButtonGroup,
  Badge,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import nullImage from "../NullImage/null.png";

const itemsPerPage = 12;
const YOUR_API_KEY = process.env.REACT_APP_APIKEY;

const PersonCredits = ({ movieCredits }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [genreData, setGenreData] = useState({});
  const [sortedMovieCredits, setSortedMovieCredits] = useState([]);
  const [sortBy, setSortBy] = useState("popularity");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: YOUR_API_KEY,
          language: "en-US",
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

  useEffect(() => {
    if (movieCredits && movieCredits.length > 0) {
      // movieCredits boş veya tanımsız değilse devam et
      let sortedCredits = [...movieCredits];
      if (sortBy === "popularity") {
        sortedCredits = sortedCredits.sort(
          (a, b) => b.popularity - a.popularity
        );
      } else if (sortBy === "release_date") {
        sortedCredits = sortedCredits.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      } else if (sortBy === "vote_count") {
        sortedCredits = sortedCredits.sort(
          (a, b) => b.vote_count - a.vote_count
        );
      }
      setSortedMovieCredits(sortedCredits);
    }
  }, [sortBy, movieCredits]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const moviesToShow = sortedMovieCredits.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedMovieCredits.length / itemsPerPage);

  const showDetails = (movie) => {
    navigate(`/movieDetails/${movie.id}`, { state: movie });
  };

  return (
    <Box mt={8}>
      <Heading as="h2" size="xl" mb={4}>
        Oyuncunun Rol Aldığı Filmler
      </Heading>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button
            colorScheme={sortBy === "popularity" ? "teal" : "gray"}
            onClick={() => setSortBy("popularity")}>
            Popülerlik
          </Button>
          <Button
            colorScheme={sortBy === "release_date" ? "teal" : "gray"}
            onClick={() => setSortBy("release_date")}>
            Yayın Tarihi
          </Button>
          <Button
            colorScheme={sortBy === "vote_count" ? "teal" : "gray"}
            onClick={() => setSortBy("vote_count")}>
            Oy Sayısı
          </Button>
        </ButtonGroup>
        <Text fontSize="lg">
          Şu anki sıralama:{" "}
          <strong>
            {sortBy === "popularity"
              ? "Popülerlik"
              : sortBy === "release_date"
              ? "Yayın Tarihi"
              : "Oy Sayısı"}
          </strong>
        </Text>
      </Flex>
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
            onClick={() => showDetails(credit)}
            _hover={{ transform: "scale(1.05)", transition: "0.3s" }}>
            <Image
              src={
                credit.backdrop_path &&
                credit.backdrop_path !== null &&
                credit.backdrop_path !== "null"
                  ? `https://image.tmdb.org/t/p/original${credit.backdrop_path}`
                  : nullImage
              }
              alt={credit.title}
              borderRadius="full"
              boxSize="150px"
              mx="auto"
            />

            <Heading fontSize="lg" mt={4}>
              {credit.title}
            </Heading>
            <Text mt={2}>
              Türler:{" "}
              {credit?.genre_ids?.map((genreId) => (
                <Badge key={genreId} colorScheme="green" ml={1}>
                  {genreData[genreId]}{" "}
                </Badge>
              ))}
            </Text>
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
          mr={2}
          colorScheme="blue">
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
          ml={2}
          colorScheme="blue">
          Sonraki
        </Button>
      </Flex>
    </Box>
  );
};

export default PersonCredits;
