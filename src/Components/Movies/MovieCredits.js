import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  useColorModeValue,
  SimpleGrid,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  creditList,
  getCredit,
} from "../../app/features/movies/details/creditSlice";
import CastItem from "./CastItem";
import CrewItem from "./CrewItem";
import ToggleButton from "./ToggleButton";
import PaginationButton from "./PaginationButton";
import Title from "../Title/titles";

const MovieCredits = () => {
  const dispatch = useDispatch();
  const movieCredits = useSelector(creditList);
  const { id } = useParams();
  const navigate = useNavigate();

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [isCastPage, setIsCastPage] = useState(true);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.50");

  useEffect(() => {
    if (id) {
      dispatch(getCredit(id));
      setCurrentPage(1);
    }
  }, [dispatch, id]);

  if (!movieCredits) {
    return (
      <Center py={6}>
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  const cast = movieCredits.cast || [];
  const crew = movieCredits.crew || [];

  if (cast.length === 0 && crew.length === 0) {
    return (
      <Text m={4} align="center" color="gray.500">
        Oyuncu veya ekip üyesi bulunamadı.
      </Text>
    );
  }

  const showDetails = (person) => {
    navigate(`/ActorDetails/${person.id}`, { state: person });
  };

  const handleTogglePage = () => {
    setIsCastPage((prev) => !prev);
    setCurrentPage(1);
  };

  const currentItems = isCastPage ? cast : crew;
  const totalPages = Math.max(1, Math.ceil(currentItems.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = currentItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <Box
      p={4}
      mx="auto"
      boxShadow="md"
      bg={bgColor}
      color={textColor}
      borderRadius="lg"
      my={4}
    >
      <Title text={isCastPage ? "Oyuncu Kadrosu" : "Ekip Üyeleri"} />
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 4 }}
        spacing={4}
        my={4}
        justifyItems="center"
      >
        {visibleItems.map((credit, index) =>
          isCastPage ? (
            <CastItem
              key={`cast-${credit.credit_id || index}`}
              credit={credit}
              showDetails={showDetails}
            />
          ) : (
            <CrewItem
              key={`crew-${credit.credit_id || index}`}
              credit={credit}
              showDetails={showDetails}
            />
          ),
        )}
      </SimpleGrid>
      <ToggleButton
        isCastPage={isCastPage}
        handleTogglePage={handleTogglePage}
      />
      <Box mt={4} textAlign="center">
        <Text fontSize="sm" color="gray.500" mb={2}>
          Toplam {isCastPage ? "Oyuncu" : "Ekip"}: {currentItems.length} |
          Sayfa: {currentPage} / {totalPages}
        </Text>
        <PaginationButton
          currentPage={currentPage}
          totalPages={totalPages}
          goToPreviousPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          goToNextPage={() =>
            setCurrentPage((p) => Math.min(p + 1, totalPages))
          }
        />
      </Box>
    </Box>
  );
};

export default MovieCredits;
