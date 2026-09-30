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
  Text,
  IconButton,
  VStack,
  SimpleGrid,
  Container,
  Center,
  Badge,
  Skeleton,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FaStar, FaExclamationTriangle } from "react-icons/fa";
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

  return (
    <Box
      bg="gray.950"
      color="white"
      minH="100vh"
      py={{ base: 8, md: 12 }}
      position="relative"
      overflow="hidden"
    >
      {/* Sinematik Kırmızı Vurgu Işığı */}
      <Box
        position="absolute"
        top="-5%"
        left="50%"
        transform="translateX(-50%)"
        w="700px"
        h="350px"
        bgGradient="radial(red.600 0%, transparent 70%)"
        opacity={0.12}
        filter="blur(70px)"
        pointerEvents="none"
        zIndex={0}
      />

      <Container maxW="container.xl" zIndex={1} position="relative">
        <VStack spacing={{ base: 8, md: 10 }} align="stretch">
          {/* Başlık Alanı */}
          <VStack spacing={3} textAlign="center">
            <Title text="En Çok Oy Alan Diziler" />
            <Text
              color="gray.400"
              fontSize={{ base: "sm", md: "md" }}
              maxW="600px"
            >
              Eleştirmenlerden ve izleyicilerden en yüksek puanları almış,
              sinema tarihine damga vuran yapımlar.
            </Text>
          </VStack>

          {/* Skeleton Loading (Yükleniyor Durumu) */}
          {status === "loading" && (
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
              spacing={6}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  key={index}
                  h="380px"
                  borderRadius="2xl"
                  startColor="gray.900"
                  endColor="gray.800"
                />
              ))}
            </SimpleGrid>
          )}

          {/* Hata Durumu */}
          {status === "failed" && (
            <Center
              py={12}
              bg="gray.900"
              borderRadius="2xl"
              border="1px solid"
              borderColor="red.900"
            >
              <VStack spacing={3}>
                <Icon as={FaExclamationTriangle} boxSize={10} color="red.500" />
                <Text fontSize="lg" color="red.400" fontWeight="semibold">
                  Hata: {error}
                </Text>
              </VStack>
            </Center>
          )}

          {/* İçerik Listesi */}
          {status === "succeeded" && (
            <>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                spacing={6}
              >
                {topRatedSeries.map((series) => (
                  <SeriesCardDetail key={series.id} series={series} />
                ))}
              </SimpleGrid>

              {/* Sayfalama (Pagination) */}
              <Flex
                justify="space-between"
                align="center"
                mt={6}
                bg="gray.900"
                p={4}
                px={6}
                borderRadius="2xl"
                border="1px solid"
                borderColor="gray.800"
                boxShadow="xl"
                direction={{ base: "column", sm: "row" }}
                gap={4}
              >
                <HStack spacing={2} color="gray.400" fontSize="sm">
                  <Icon as={FaStar} color="yellow.400" />
                  <Text>En Yüksek Puanlı Diziler</Text>
                </HStack>

                <Flex align="center" gap={3}>
                  <IconButton
                    icon={<ChevronLeftIcon w={6} h={6} />}
                    onClick={handlePrevPage}
                    isDisabled={currentPage === 1}
                    aria-label="Önceki Sayfa"
                    bg="gray.800"
                    color="white"
                    borderRadius="xl"
                    _hover={{ bg: "red.600" }}
                    _disabled={{ opacity: 0.3, cursor: "not-allowed" }}
                    size="md"
                  />

                  <Badge
                    px={4}
                    py={2}
                    borderRadius="xl"
                    bg="gray.800"
                    color="gray.200"
                    border="1px solid"
                    borderColor="gray.700"
                    fontSize="sm"
                    fontWeight="semibold"
                  >
                    Sayfa{" "}
                    <Text as="span" color="red.500" fontWeight="bold">
                      {currentPage}
                    </Text>{" "}
                    / {totalPages}
                  </Badge>

                  <IconButton
                    icon={<ChevronRightIcon w={6} h={6} />}
                    onClick={handleNextPage}
                    isDisabled={currentPage === totalPages}
                    aria-label="Sonraki Sayfa"
                    bg="gray.800"
                    color="white"
                    borderRadius="xl"
                    _hover={{ bg: "red.600" }}
                    _disabled={{ opacity: 0.3, cursor: "not-allowed" }}
                    size="md"
                  />
                </Flex>
              </Flex>
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default TopSeries;
