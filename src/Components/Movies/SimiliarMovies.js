import React, { useState } from "react";
import { VStack, Text, HStack, IconButton, SimpleGrid } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import MovieCard from "../Cards/MovieCards";

const SimilarMovies = ({ movieSimilar }) => {
  const moviesPerPage = 3; // Sayfa başına gösterilen film sayısı
  const [currentPage, setCurrentPage] = useState(0);

  // Mevcut sayfadaki filmleri hesapla
  const indexOfLastMovie = (currentPage + 1) * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movieSimilar.slice(indexOfFirstMovie, indexOfLastMovie);

  // Sayfa numarasını artırma veya azaltma işlevleri
  const handleNextPage = () => {
    if (currentPage < Math.ceil(movieSimilar.length / moviesPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <VStack spacing={4} align="left">
      <Text fontWeight="bold">Benzer Filmler:</Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </SimpleGrid>
      <HStack>
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={handlePrevPage}
          isDisabled={currentPage === 0}
        />
        <Text>Sayfa {currentPage + 1}</Text>
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={handleNextPage}
          isDisabled={
            currentPage === Math.ceil(movieSimilar.length / moviesPerPage) - 1
          }
        />
      </HStack>
    </VStack>
  );
};

export default SimilarMovies;
