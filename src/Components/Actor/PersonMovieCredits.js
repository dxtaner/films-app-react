import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Spinner,
  Alert,
  AlertIcon,
  VStack,
  Text,
  HStack,
  Flex,
  Select,
  Center,
  Image,
  Badge,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import { fetchPersonMovieCredits } from "../../app/features/actors/personMoviesSlice";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Title from "../Title/titles";

const PersonMovieCredits = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { credits, status, error } = useSelector((state) => state.personMovies);
  const [sortCriterion, setSortCriterion] = useState("popularity");
  const [view, setView] = useState("cast");
  const [currentPage, setCurrentPage] = useState(1);
  const creditsPerPage = 10;

  useEffect(() => {
    if (id) {
      dispatch(fetchPersonMovieCredits(id));
    }
  }, [dispatch, id]);

  const handleSortChange = (e) => {
    setSortCriterion(e.target.value);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    setCurrentPage(1);
  };

  const sortCredits = (items, criterion) => {
    if (!items) return [];
    return [...items].sort((a, b) => {
      if (criterion === "release_date") {
        return new Date(b.release_date || 0) - new Date(a.release_date || 0);
      }
      return (b[criterion] || 0) - (a[criterion] || 0);
    });
  };

  const activeCredits = view === "cast" ? credits?.cast : credits?.crew;
  const sortedCredits = sortCredits(activeCredits, sortCriterion);

  const indexOfLastCredit = currentPage * creditsPerPage;
  const indexOfFirstCredit = indexOfLastCredit - creditsPerPage;
  const currentCredits = sortedCredits.slice(
    indexOfFirstCredit,
    indexOfLastCredit,
  );
  const totalPages = Math.ceil(sortedCredits.length / creditsPerPage);

  return (
    <Box
      p={6}
      borderRadius="xl"
      bg="gray.800"
      border="1px solid"
      borderColor="gray.700"
    >
      <VStack spacing={6} align="stretch">
        <Title text="Film Yapımları" />

        <Flex wrap="wrap" justify="space-between" align="center" gap={4}>
          <ButtonGroup isAttached variant="outline">
            <Button
              bg={view === "cast" ? "red.600" : "transparent"}
              color="white"
              borderColor="gray.600"
              _hover={{ bg: view === "cast" ? "red.700" : "gray.700" }}
              onClick={() => handleViewChange("cast")}
            >
              Oyuncu
            </Button>
            <Button
              bg={view === "crew" ? "red.600" : "transparent"}
              color="white"
              borderColor="gray.600"
              _hover={{ bg: view === "crew" ? "red.700" : "gray.700" }}
              onClick={() => handleViewChange("crew")}
            >
              Ekip
            </Button>
          </ButtonGroup>

          <Select
            maxW="200px"
            value={sortCriterion}
            onChange={handleSortChange}
            bg="gray.900"
            color="white"
            borderColor="gray.700"
            _focus={{ borderColor: "red.500" }}
          >
            <option value="popularity" style={{ background: "#1A202C" }}>
              Popülerlik
            </option>
            <option value="release_date" style={{ background: "#1A202C" }}>
              Yayın Tarihi
            </option>
            <option value="vote_count" style={{ background: "#1A202C" }}>
              Oy Sayısı
            </option>
          </Select>
        </Flex>

        {status === "loading" && (
          <Center py={8}>
            <Spinner size="xl" color="red.500" />
          </Center>
        )}

        {status === "failed" && (
          <Alert status="error" bg="red.900" color="red.200" borderRadius="md">
            <AlertIcon color="red.400" />
            {error}
          </Alert>
        )}

        {status === "succeeded" && (
          <>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(5, 1fr)",
              }}
              gap={4}
            >
              {currentCredits.map((movie) => (
                <GridItem key={movie.credit_id || movie.id}>
                  <Box
                    p={3}
                    bg="gray.900"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="gray.700"
                    h="100%"
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      transform: "translateY(-4px)",
                      borderColor: "red.500",
                    }}
                    onClick={() => navigate(`/MovieDetails/${movie.id}`)}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Image
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                          : "https://via.placeholder.com/200x300/1A202C/FFFFFF?text=Afiş+Yok"
                      }
                      alt={movie.title}
                      borderRadius="md"
                      objectFit="cover"
                      h="220px"
                      w="100%"
                      mb={2}
                    />
                    <Box flex="1">
                      <Text
                        fontWeight="bold"
                        fontSize="sm"
                        color="white"
                        noOfLines={1}
                        mb={1}
                      >
                        {movie.title}
                      </Text>
                      {view === "cast" ? (
                        <Badge
                          colorScheme="red"
                          fontSize="10px"
                          noOfLines={1}
                          mb={2}
                        >
                          {movie.character || "Belirtilmedi"}
                        </Badge>
                      ) : (
                        <Badge
                          colorScheme="purple"
                          fontSize="10px"
                          noOfLines={1}
                          mb={2}
                        >
                          {movie.job || movie.department}
                        </Badge>
                      )}
                    </Box>
                    <HStack
                      justify="space-between"
                      fontSize="xs"
                      color="gray.400"
                      pt={2}
                      borderTop="1px solid"
                      borderColor="gray.800"
                    >
                      <Text>
                        {movie.release_date
                          ? movie.release_date.split("-")[0]
                          : "-"}
                      </Text>
                      <HStack spacing={1} color="yellow.400">
                        <Icon as={FaStar} />
                        <Text>
                          {movie.vote_average
                            ? movie.vote_average.toFixed(1)
                            : "N/A"}
                        </Text>
                      </HStack>
                    </HStack>
                  </Box>
                </GridItem>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Flex justify="center" gap={2} mt={4} flexWrap="wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <Button
                      key={num}
                      size="sm"
                      bg={currentPage === num ? "red.600" : "gray.900"}
                      color="white"
                      borderColor="gray.700"
                      border="1px solid"
                      _hover={{ bg: "red.500" }}
                      onClick={() => setCurrentPage(num)}
                    >
                      {num}
                    </Button>
                  ),
                )}
              </Flex>
            )}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default PersonMovieCredits;
