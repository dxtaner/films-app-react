import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchResults,
  searchMoviesAsync,
} from "../../app/features/movies/searchSlice.js";
import { SimpleGrid, Text, Box, Button } from "@chakra-ui/react";
import MovieCard from "../Cards/MovieCards.js";
import Title from "../Title/titles.js";
import { useNavigate } from "react-router-dom";

const RESULTS_PER_PAGE = 5; // Her sayfada gösterilecek sonuç sayısı

const SearchMovie = () => {
  const dispatch = useDispatch();
  const searchMovies = useSelector(selectSearchResults);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    const page =
      parseInt(new URLSearchParams(location.search).get("page")) || 1;
    setCurrentPage(page);
    if (query) {
      dispatch(searchMoviesAsync(query, page));
    }
  }, [dispatch, location]);

  const totalResults = searchMovies.length;
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const query = new URLSearchParams(location.search).get("query");
      navigate(`/searchMovies?query=${query}&page=${page}`);
    }
  };

  const displayedResults = searchMovies.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  return (
    <Box mt={8}>
      <Title>En İyi 20 Arama Sonucu</Title>
      {totalResults === 0 ? (
        <Text align="center">Sonuç Bulunamadı</Text>
      ) : (
        <>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={4}
            justifyItems="center">
            {displayedResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </SimpleGrid>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="outline"
              size="sm"
              mx={1}
              onClick={() => handlePageChange(currentPage - 1)} // Önceki sayfaya gitmek için
              isDisabled={currentPage <= 1} // Sayfa 1 veya daha küçükse düğmeyi kapat
            >
              Previous Page
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant="outline"
                size="sm"
                mx={1}
                onClick={() => handlePageChange(index + 1)}
                isDisabled={currentPage === index + 1}>
                {index + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              mx={1}
              onClick={() => handlePageChange(currentPage + 1)} // Sonraki sayfaya gitmek için
              isDisabled={currentPage >= totalPages} // Sayfa son sayfa veya daha büyükse düğmeyi kapat
            >
              Next Page
            </Button>
          </div>
        </>
      )}
    </Box>
  );
};

export default SearchMovie;
