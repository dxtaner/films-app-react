import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTopRatedSeries } from "../../app/features/series/topSeriesSlice.js";
import { Box, Center, Heading, Spinner, Text, Wrap } from "@chakra-ui/react";
import SeriesCardDetail from "../Cards/SeriesCardDetail.js";

const TopSeries = () => {
  const dispatch = useDispatch();
  const topSeries = useSelector((state) => state.topSeries.series);
  const status = useSelector((state) => state.topSeries.status);
  const error = useSelector((state) => state.topSeries.error);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchTopRatedSeries());
  }, [dispatch]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const seriesToShow = topSeries.slice(startIndex, endIndex);

  const totalPages = Math.ceil(topSeries.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        En İyi Diziler
      </Heading>
      <Box borderBottom="1px solid #ccc" mb={4} />
      {status === "loading" ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : status === "failed" ? (
        <Text fontSize="lg">Hata: {error}</Text>
      ) : seriesToShow.length > 0 ? (
        <>
          <Wrap spacing={4} justify="center">
            {seriesToShow.map((series) => (
              <SeriesCardDetail key={series.id} series={series} />
            ))}
          </Wrap>
          <Box mt={4}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  margin: "0.2rem",
                  padding: "0.2rem 0.5rem",
                  cursor: "pointer",
                  border:
                    currentPage === index + 1
                      ? "2px solid teal"
                      : "1px solid gray",
                }}>
                {index + 1}
              </button>
            ))}
          </Box>
        </>
      ) : (
        <Text fontSize="lg">Hiç veri bulunamadı.</Text>
      )}
    </Box>
  );
};

export default TopSeries;
