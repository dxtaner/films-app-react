import React from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Flex,
  HStack,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { FaStar, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { useGenres } from "../../hooks/useGenres";

const SeriesCardDetail = ({ series }) => {
  const {
    name,
    genre_ids = [],
    first_air_date,
    overview,
    backdrop_path,
    poster_path,
    vote_average,
    vote_count,
    origin_country,
  } = series;

  const genreData = useGenres();

  const imageSrc =
    backdrop_path || poster_path
      ? `https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`
      : "https://via.placeholder.com/500x281/1A202C/FFFFFF?text=Görsel+Yok";

  const formattedDate = first_air_date
    ? new Date(first_air_date).toLocaleDateString("tr-TR", {
        year: "numeric",
      })
    : "Tarih Yok";

  return (
    <Box
      borderRadius="2xl"
      overflow="hidden"
      bg="gray.900"
      border="1px solid"
      borderColor="gray.800"
      boxShadow="lg"
      transition="all 0.3s cubic-bezier(.25,.8,.25,1)"
      _hover={{
        transform: "translateY(-6px)",
        borderColor: "red.600",
        boxShadow: "0 12px 24px -10px rgba(229, 62, 62, 0.3)",
      }}
      display="flex"
      flexDirection="column"
      h="100%"
    >
      {/* Görsel Alanı */}
      <Box position="relative" overflow="hidden">
        <Image
          src={imageSrc}
          alt={name}
          w="100%"
          h="180px"
          objectFit="cover"
          transition="transform 0.5s ease"
          _groupHover={{ transform: "scale(1.05)" }}
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-t, gray.900 0%, transparent 60%)"
        />

        {/* Puan Rozeti */}
        <Badge
          position="absolute"
          top={3}
          right={3}
          bg="rgba(0, 0, 0, 0.75)"
          color="yellow.400"
          backdropFilter="blur(4px)"
          border="1px solid"
          borderColor="yellow.500"
          borderRadius="lg"
          px={2.5}
          py={1}
          display="flex"
          alignItems="center"
          gap={1.5}
          fontSize="xs"
          fontWeight="bold"
        >
          <Icon as={FaStar} boxSize={3} />
          {vote_average ? vote_average.toFixed(1) : "N/A"}
        </Badge>
      </Box>

      {/* İçerik Detayları */}
      <Flex p={4} direction="column" flex="1" justify="space-between" gap={3}>
        <Box>
          <Heading
            as="h3"
            size="md"
            color="white"
            fontWeight="bold"
            noOfLines={1}
            mb={1}
          >
            {name}
          </Heading>

          <HStack color="gray.400" fontSize="xs" spacing={3} mb={3}>
            <HStack spacing={1}>
              <Icon as={FaCalendarAlt} color="red.500" />
              <Text>{formattedDate}</Text>
            </HStack>
            {origin_country && origin_country.length > 0 && (
              <Badge
                colorScheme="red"
                variant="subtle"
                fontSize="10px"
                borderRadius="md"
              >
                {origin_country[0]}
              </Badge>
            )}
          </HStack>

          {/* Türler */}
          <Flex flexWrap="wrap" gap={1.5} mb={3}>
            {genre_ids.slice(0, 3).map((genreId) => (
              <Badge
                key={genreId}
                bg="gray.800"
                color="gray.300"
                fontSize="10px"
                px={2}
                py={0.5}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.700"
              >
                {genreData[genreId] || "..."}
              </Badge>
            ))}
          </Flex>

          <Text
            fontSize="xs"
            color="gray.400"
            noOfLines={3}
            lineHeight="relaxed"
          >
            {overview || "Açıklama bulunmuyor."}
          </Text>
        </Box>

        {/* Alt Bilgi Çubuğu */}
        <Flex
          justify="space-between"
          align="center"
          pt={3}
          borderTop="1px solid"
          borderColor="gray.800"
          fontSize="xs"
          color="gray.500"
        >
          <Tooltip
            label="Toplam Kullanıcı Oyu"
            hasArrow
            bg="gray.800"
            color="white"
          >
            <HStack spacing={1}>
              <Icon as={FaUsers} color="gray.400" />
              <Text>{vote_count ? vote_count.toLocaleString() : 0} Oy</Text>
            </HStack>
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SeriesCardDetail;
