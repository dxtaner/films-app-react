import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPopularSeries,
  setCurrentPage,
} from "../../app/features/series/popularSeriesSlice";
import {
  Box,
  Center,
  Text,
  IconButton,
  Flex,
  HStack,
  VStack,
  SimpleGrid,
  Container,
  Button,
  Skeleton,
  Icon,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FaTv, FaExclamationTriangle } from "react-icons/fa";
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

  const totalResults = totalPages * 20;
  const maxPages = Math.min(totalPages, 10);
  const displayPages = Array.from({ length: maxPages }, (_, i) => i + 1);

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
            <Title text="Popüler Diziler" />
            <Text
              color="gray.400"
              fontSize={{ base: "sm", md: "md" }}
              maxW="600px"
            >
              Dünya genelinde en çok izlenen, sosyal medyada en çok konuşulan ve
              gündemdeki popüler dizileri keşfedin.
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
                  Bir hata oluştu: {error}
                </Text>
              </VStack>
            </Center>
          )}

          {/* İçerik Listesi */}
          {status === "succeeded" && (
            <>
              {seriesPopular.length > 0 ? (
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                  spacing={6}
                >
                  {seriesPopular.map((series) => (
                    <SeriesCardDetail key={series.id} series={series} />
                  ))}
                </SimpleGrid>
              ) : (
                <Center
                  py={16}
                  bg="gray.900"
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="gray.800"
                >
                  <Text fontSize="lg" color="gray.400">
                    Görüntülenecek dizi bulunamadı.
                  </Text>
                </Center>
              )}

              {/* Sayfalama (Pagination) */}
              <VStack
                spacing={4}
                pt={6}
                bg="gray.900"
                p={6}
                borderRadius="2xl"
                border="1px solid"
                borderColor="gray.800"
                boxShadow="xl"
              >
                <Flex justify="center" align="center" gap={3} wrap="wrap">
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

                  <HStack spacing={2} overflowX="auto" py={1} maxW="100%">
                    {displayPages.map((page) => (
                      <Button
                        key={page}
                        size="sm"
                        borderRadius="lg"
                        variant={currentPage === page ? "solid" : "outline"}
                        colorScheme="red"
                        bg={currentPage === page ? "red.600" : "transparent"}
                        borderColor={
                          currentPage === page ? "red.600" : "gray.700"
                        }
                        color="white"
                        _hover={{
                          bg: currentPage === page ? "red.500" : "gray.800",
                        }}
                        onClick={() => dispatch(setCurrentPage(page))}
                      >
                        {page}
                      </Button>
                    ))}
                  </HStack>

                  <IconButton
                    icon={<ChevronRightIcon w={6} h={6} />}
                    onClick={handleNextPage}
                    isDisabled={
                      currentPage === totalPages || currentPage === 10
                    }
                    aria-label="Sonraki Sayfa"
                    bg="gray.800"
                    color="white"
                    borderRadius="xl"
                    _hover={{ bg: "red.600" }}
                    _disabled={{ opacity: 0.3, cursor: "not-allowed" }}
                    size="md"
                  />
                </Flex>

                <HStack color="gray.400" fontSize="xs" spacing={2}>
                  <Icon as={FaTv} color="red.500" />
                  <Text>
                    Toplam{" "}
                    <Text as="span" color="white" fontWeight="bold">
                      {totalPages}
                    </Text>{" "}
                    sayfada yaklaşık{" "}
                    <Text as="span" color="white" fontWeight="bold">
                      {totalResults}
                    </Text>{" "}
                    dizi yer alıyor.
                  </Text>
                </HStack>
              </VStack>
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default PopularSeries;
