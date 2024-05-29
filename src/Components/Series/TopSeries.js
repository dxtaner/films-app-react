// components/TopSeries.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchTopRatedSeries,
  setCurrentPage,
} from "../../app/features/series/topSeriesSlice";
import SeriesCardDetail from "../Cards/SeriesCardDetail";
import {
  Box,
  Flex,
  Spinner,
  Text,
  IconButton,
  Stack,
  useColorModeValue,
  VStack,
  SimpleGrid,
  StackDivider,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Title from "../Title/titles";

const TopSeries = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    series: topRatedSeries,
    status,
    error,
    currentPage,
    totalPages,
  } = useSelector((state) => state.topSeries);

  useEffect(() => {
    dispatch(fetchTopRatedSeries(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch, location.pathname]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const bgColor = useColorModeValue("blue", "blue.800");
  const textColor = useColorModeValue("black", "white");
  return (
    <VStack
      spacing={4}
      p={[2, 4, 6, 8]}
      divider={<StackDivider borderColor={bgColor} />}
      color={textColor}
      borderRadius="lg"
      boxShadow="md">
      <Box textAlign="center">
        <Title text="En Çok Oy Alan Diziler" />
        <Text>En çok oy alan Dizilerin Listesi</Text>
      </Box>
      {status === "loading" && (
        <Flex justify="center">
          <Spinner size="xl" />
        </Flex>
      )}
      {status === "failed" && (
        <Text textAlign="center" color="red.500">
          Error: {error}
        </Text>
      )}
      {status === "succeeded" && (
        <>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={4}>
            {topRatedSeries.map((series) => (
              <SeriesCardDetail key={series.id} series={series} />
            ))}
          </SimpleGrid>
          <Flex justify="center" align="center" mt={4}>
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={handlePrevPage}
              isDisabled={currentPage === 1}
              aria-label="Previous Page"
              size="sm"
              mr={2}
            />
            <Stack direction="row" spacing={4} align="center">
              <Text fontSize="lg">
                {currentPage} / {totalPages}
              </Text>
            </Stack>
            <IconButton
              icon={<ChevronRightIcon />}
              onClick={handleNextPage}
              isDisabled={currentPage === totalPages}
              aria-label="Next Page"
              size="sm"
              ml={2}
            />
          </Flex>
        </>
      )}
    </VStack>
  );
};

export default TopSeries;
