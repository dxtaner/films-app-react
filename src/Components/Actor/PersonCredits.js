import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VStack, Text, Flex, Spinner, Center, Divider } from "@chakra-ui/react";
import axios from "axios";
import PersonCreditCard from "./PersonCreditCard";
import SortButtons from "./SortButtons";
import SortText from "./SortText";
import Pagination from "./Pagination";

const itemsPerPage = 12;

const PersonCredits = ({ movieCredits }) => {
  const navigate = useNavigate();
  const [sortedMovieCredits, setSortedMovieCredits] = useState([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(0);
  const [genreData, setGenreData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  useEffect(() => {
    if (movieCredits && movieCredits.length > 0) {
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

  const showDetails = (credit) => {
    navigate(`/movieDetails/${credit.id}`, { state: credit });
  };

  const renderMovieCards = () => {
    return sortedMovieCredits
      .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      .map((credit) => (
        <PersonCreditCard
          key={credit.credit_id}
          credit={credit}
          showDetails={showDetails}
          genreData={genreData}
        />
      ));
  };

  return (
    <VStack spacing={6} align="center">
      <Text fontSize="2xl" fontWeight="bold">
        Oyuncunun Rol Aldığı Filmler
      </Text>
      <SortSection sortBy={sortBy} setSortBy={setSortBy} />
      {loading ? (
        <Center>
          <Spinner size="xl" color="teal.500" />
        </Center>
      ) : (
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="flex-start"
          width="100%">
          {renderMovieCards()}
        </Flex>
      )}
      <PaginationSection
        currentPage={currentPage}
        totalPages={Math.ceil(sortedMovieCredits.length / itemsPerPage)}
        setCurrentPage={setCurrentPage}
      />
    </VStack>
  );
};

const SortSection = ({ sortBy, setSortBy }) => (
  <Flex
    justifyContent={{ base: "center", md: "space-between" }}
    alignItems="center"
    width="100%"
    mb={{ base: 4, md: 8 }}>
    <SortButtons sortBy={sortBy} setSortBy={setSortBy} />
    <SortText sortBy={sortBy} />
  </Flex>
);

const PaginationSection = ({ currentPage, totalPages, setCurrentPage }) => (
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    setCurrentPage={setCurrentPage}
  />
);

export default PersonCredits;
