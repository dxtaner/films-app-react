import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Spinner,
  Alert,
  AlertIcon,
  VStack,
  Heading,
  Text,
  HStack,
  Flex,
  Select,
  Center,
  Image,
  Badge,
  Button,
  ButtonGroup,
  Tooltip,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { fetchPersonMovieCredits } from "../../app/features/actors/personMoviesSlice";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../Title/titles";

const PersonMovieCredits = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { credits, status, error } = useSelector((state) => state.personMovies);
  const [sortCriterion, setSortCriterion] = useState("popularity");
  const [view, setView] = useState("cast");
  const [genreData, setGenreData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const creditsPerPage = 10;

  useEffect(() => {
    if (id) {
      dispatch(fetchPersonMovieCredits(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: {
              api_key: process.env.REACT_APP_APIKEY,
              language: "tr-US",
            },
          }
        );
        const genres = {};
        response.data.genres.forEach((genre) => {
          genres[genre.id] = genre.name;
        });
        setGenreData(genres);
        setLoading(false);
      } catch (error) {
        console.error("Genre data fetch error:", error);
      }
    };

    fetchGenreData();
  }, [loading]);

  const handleSortChange = (e) => {
    setSortCriterion(e.target.value);
  };

  const handleViewChange = (view) => {
    setView(view);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreditClick = (movieId) => {
    navigate(`/MovieDetails/${movieId}`);
  };

  const sortCredits = (credits, criterion) => {
    return credits.sort((a, b) => {
      if (criterion === "release_date") {
        return new Date(b.release_date) - new Date(a.release_date);
      } else {
        return b[criterion] - a[criterion];
      }
    });
  };

  const sortedCredits =
    view === "cast"
      ? sortCredits([...credits.cast], sortCriterion)
      : sortCredits([...credits.crew], sortCriterion);

  const indexOfLastCredit = currentPage * creditsPerPage;
  const indexOfFirstCredit = indexOfLastCredit - creditsPerPage;
  const currentCredits = sortedCredits.slice(
    indexOfFirstCredit,
    indexOfLastCredit
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedCredits.length / creditsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderCredits = (credits) => {
    return credits.map((movie) => (
      <GridItem key={movie.id} w="100%">
        <Flex justifyContent="center">
          <Box
            p={4}
            bg="gray.50"
            borderRadius="md"
            boxShadow="md"
            _hover={{ boxShadow: "lg", cursor: "pointer" }}>
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              borderRadius="lg"
              objectFit="cover"
              fallbackSrc="https://via.placeholder.com/220"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.05)" }}
              m="2"
            />

            <Text
              fontWeight="bold"
              fontSize="xl"
              cursor="pointer"
              onClick={() => handleCreditClick(movie.id)}
              mb={1}
              _hover={{ color: "blue.500" }}
              textAlign="center">
              {movie.title}
            </Text>

            <Text
              as="i"
              fontSize="md"
              color="gray.600"
              mb={1}
              textAlign="center">
              {movie.original_title}
            </Text>

            <Text color="gray.500" mb={2} textAlign="center">
              {movie.release_date}
            </Text>

            <Text noOfLines={3} mb={2} textAlign="center">
              {movie.overview}
            </Text>

            <VStack align="start" spacing={2} mb={2}>
              <HStack spacing={4} wrap="wrap">
                <Tooltip label={`Oy Ortalaması: ${movie.vote_average}`}>
                  <Badge colorScheme="green" cursor="pointer">
                    Oy Ortalaması: {movie.vote_average}
                  </Badge>
                </Tooltip>
                <Tooltip label={`Oylar: ${movie.vote_count}`}>
                  <Badge colorScheme="blue" cursor="pointer">
                    Oylar: {movie.vote_count}
                  </Badge>
                </Tooltip>
              </HStack>

              {view === "cast" ? (
                <Text mb={2}>Karakter: {movie.character}</Text>
              ) : (
                <VStack align="start" spacing={1}>
                  <Text>Görev: {movie.job}</Text>
                  <Text>Departman: {movie.department}</Text>
                </VStack>
              )}

              <Text mb={2}>
                Türler: {movie.genre_ids.map((id) => genreData[id]).join(", ")}
              </Text>
            </VStack>
          </Box>
        </Flex>
      </GridItem>
    ));
  };

  return (
    <Box
      p={6}
      borderRadius="lg"
      bg="white"
      boxShadow="lg"
      maxW="container.xl"
      mx="auto">
      <VStack spacing={6} align="start">
        <Title text="Oyuncunun Rol Aldığı Yapımlar "></Title>
        <Flex
          wrap={"wrap"}
          justify="space-between"
          w="full"
          align="center"
          mb={4}>
          <ButtonGroup variant="outline" spacing="6">
            <Button
              colorScheme={view === "cast" ? "blue" : "gray"}
              onClick={() => handleViewChange("cast")}>
              Filmler
            </Button>
            <Button
              colorScheme={view === "crew" ? "blue" : "gray"}
              onClick={() => handleViewChange("crew")}>
              Ekip
            </Button>
          </ButtonGroup>
          <Select
            maxW="200px"
            value={sortCriterion}
            onChange={handleSortChange}>
            <option value="popularity">Popülerlik</option>
            <option value="release_date">Yayın Tarihi</option>
            <option value="vote_count">Oy Sayısı</option>
          </Select>
        </Flex>

        {status === "loading" && (
          <Center w="full">
            <Spinner size="xl" color="blue.500" />
          </Center>
        )}
        {status === "failed" && (
          <Alert status="error" variant="solid" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {status === "succeeded" && (
          <>
            <Heading as="h3" size="lg" mt={4}>
              {view === "cast" ? "Filmler" : "Ekip"}
            </Heading>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(5, 1fr)",
              }}
              gap={6}
              w="full">
              {renderCredits(currentCredits)}
            </Grid>
            <Flex justify="center" m={4} flexWrap="wrap">
              {pageNumbers.map((number) => (
                <Button
                  key={number}
                  colorScheme={currentPage === number ? "blue" : "gray"}
                  variant={currentPage === number ? "solid" : "outline"}
                  onClick={() => handlePageChange(number)}
                  m={1}
                  borderRadius="full"
                  px={4}
                  py={2}
                  _hover={{
                    bg: currentPage === number ? "blue.600" : "gray.200",
                  }}
                  _focus={{ outline: "none" }}>
                  {number}
                </Button>
              ))}
            </Flex>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default PersonMovieCredits;
