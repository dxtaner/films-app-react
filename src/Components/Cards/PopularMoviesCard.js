import React from "react";
import { Box, Image, Text, Badge, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PopularMoviesCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;

  const getVoteColorScheme = (vote) => {
    if (vote >= 7) return "green";
    if (vote >= 5) return "yellow";
    return "red";
  };

  return (
    <Box
      bg="gray.800"
      borderRadius="xl"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.700"
      boxShadow="lg"
      transition="all 0.3s cubic-bezier(.25,.8,.25,1)"
      _hover={{
        transform: "translateY(-6px)",
        borderColor: "red.600",
        boxShadow: "0 12px 24px -10px rgba(229, 62, 62, 0.3)",
      }}
    >
      <Link to={`/MovieDetails/${id}`}>
        <Box position="relative" h="300px" bg="gray.900">
          {poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          ) : (
            <Flex
              height="100%"
              alignItems="center"
              justifyContent="center"
              bg="gray.800"
              color="gray.500"
            >
              <Text fontSize="sm" fontWeight="semibold">
                Afiş Yok
              </Text>
            </Flex>
          )}
          <Badge
            position="absolute"
            top="3"
            right="3"
            colorScheme={getVoteColorScheme(vote_average)}
            variant="solid"
            fontSize="xs"
            fontWeight="bold"
            borderRadius="md"
            px={2}
            py={1}
            boxShadow="md"
          >
            {vote_average ? vote_average.toFixed(1) : "N/A"}
          </Badge>
        </Box>
        <Box p={4}>
          <Text
            fontSize="md"
            fontWeight="bold"
            color="white"
            mb={1}
            noOfLines={1}
          >
            {title}
          </Text>
          <Text fontSize="xs" color="gray.400">
            {release_date
              ? new Date(release_date).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Tarih Bilinmiyor"}
          </Text>
        </Box>
      </Link>
    </Box>
  );
};

export default PopularMoviesCard;
