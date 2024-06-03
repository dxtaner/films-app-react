import React, { useEffect, useState } from "react";
import { Box, Text, useColorModeValue, SimpleGrid } from "@chakra-ui/react";
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
    dispatch(getCredit(id));
    setCurrentPage(1);
  }, [dispatch, id]);

  if (!movieCredits) {
    return (
      <Text m={2} align="center">
        Yükleniyor...
      </Text>
    );
  }
  if (
    !movieCredits ||
    !movieCredits.cast ||
    movieCredits.cast.length === 0 ||
    !movieCredits.crew ||
    movieCredits.crew.length === 0
  ) {
    return (
      <Text m={2} align="center">
        Oyuncu veya ekip üyesi bulunamadı.
      </Text>
    );
  }

  const showDetails = (person) => {
    navigate(`/ActorDetails/${person.id}`, { state: person });
  };

  const handleTogglePage = () => {
    setIsCastPage((prevIsCastPage) => !prevIsCastPage);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    const totalItems = isCastPage
      ? movieCredits.cast.length
      : movieCredits.crew.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = isCastPage
    ? movieCredits.cast.slice(startIndex, endIndex)
    : movieCredits.crew.slice(startIndex, endIndex);

  const totalItems = isCastPage
    ? movieCredits.cast.length
    : movieCredits.crew.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box
      p={[1, 2, 2, 4, 4]}
      fontSize={["xs", "sm", "md", "lg", "xl"]}
      textAlign="center"
      mx="auto"
      boxShadow="md"
      bg={bgColor}
      color={textColor}
      borderRadius="lg">
      <Title text={isCastPage ? "Oyuncu Kadrosu" : "Ekip Üyeleri"}></Title>
      <SimpleGrid
        columns={[1, 2, 3, 4]}
        spacing={4}
        m={2}
        p={2}
        justifyItems="center">
        {visibleItems.map((credit) =>
          isCastPage ? (
            <CastItem
              key={`cast-${credit.credit_id}`}
              credit={credit}
              showDetails={showDetails}
            />
          ) : (
            <CrewItem
              key={`crew-${credit.credit_id}`}
              credit={credit}
              showDetails={showDetails}
            />
          )
        )}
      </SimpleGrid>
      <ToggleButton
        isCastPage={isCastPage}
        handleTogglePage={handleTogglePage}
      />
      <Box mt={4} textAlign="center">
        <Text fontSize="sm" color="gray.500">
          Toplam {isCastPage ? "Oyuncu Sayısı" : "Ekip Üyesi Sayısı"}:{" "}
          {totalItems}, Şu Anki Sayfa: {currentPage} / {totalPages}
        </Text>
        <PaginationButton
          currentPage={currentPage}
          totalPages={totalPages}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
        />
      </Box>
    </Box>
  );
};

export default MovieCredits;
