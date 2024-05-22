import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPopularSeries,
  setCurrentPage,
} from "../../app/features/series/popularSeriesSlice";
import {
  Box,
  Center,
  Spinner,
  Text,
  useColorModeValue,
  IconButton,
  Flex,
  HStack,
  VStack,
  SimpleGrid,
  StackDivider,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import SeriesCardDetail from "../Cards/SeriesCardDetail";
import Title from "../Title/titles";
import { useLocation } from "react-router-dom";

const PopularSeries = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    series: seriesPopular,
    status,
    error,
    currentPage,
    totalPages,
  } = useSelector((state) => state.popularSeries);

  useEffect(() => {
    dispatch(fetchPopularSeries(currentPage));
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

  const bgColor = useColorModeValue("blue", "gray.800");
  const textColor = useColorModeValue("black", "white");

  const totalResults = totalPages * 20;
  const displayPages = Array.from(
    { length: Math.min(totalPages, 10) },
    (_, i) => i + 1
  );

  const pageInfo = (
    <Text fontSize="sm" color="gray.500">
      Toplam {totalPages} sayfada yaklaşık {totalResults} dizi bulunmaktadır.
    </Text>
  );

  return (
    <VStack
      spacing={4}
      p={[2, 4, 6, 8]}
      divider={<StackDivider borderColor={bgColor} />}
      color={textColor}
      borderRadius="lg"
      boxShadow="md">
      <Box textAlign="center">
        <Title text="Popüler Diziler" />
        <Text>En Popüler Dizilerin Listesi</Text>
      </Box>
      {status === "loading" && (
        <Center>
          <Spinner size="xl" />
        </Center>
      )}
      {status === "failed" && (
        <Text fontSize="lg" textAlign="center" color="red.500" mt={4}>
          Hata: {error}
        </Text>
      )}
      {status === "succeeded" && (
        <>
          {seriesPopular.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
              spacing={4}>
              {seriesPopular.map((series) => (
                <SeriesCardDetail key={series.id} series={series} />
              ))}
            </SimpleGrid>
          ) : (
            <Text fontSize="lg" textAlign="center" mt={4}>
              Hiç veri bulunamadı.
            </Text>
          )}
          <Flex justify="center" align="center" mt={4}>
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={handlePrevPage}
              isDisabled={currentPage === 1}
              aria-label="Önceki Sayfa"
              size="sm"
              mr={2}
            />
            <HStack spacing={2}>
              {displayPages.map((page) => (
                <Text
                  key={page}
                  cursor="pointer"
                  fontWeight={currentPage === page ? "bold" : "normal"}
                  onClick={() => dispatch(setCurrentPage(page))}>
                  {page}
                </Text>
              ))}
            </HStack>
            <IconButton
              icon={<ChevronRightIcon />}
              onClick={handleNextPage}
              isDisabled={currentPage === totalPages || currentPage === 10}
              aria-label="Sonraki Sayfa"
              size="sm"
              ml={2}
            />
          </Flex>
          <Box textAlign="center" mt={2}>
            {pageInfo}
          </Box>
        </>
      )}
    </VStack>
  );
};

export default PopularSeries;
