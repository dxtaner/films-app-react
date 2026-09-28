import React from "react";
import { Box, Text, Image, Flex, Link, Badge } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SimilarCard = ({ movie }) => {
  const { id, title, poster_path, release_date, vote_average } = movie;

  const getVoteColorScheme = (vote) => {
    if (vote >= 7) return "green";
    if (vote >= 5) return "yellow";
    return "red";
  };

  return (
    <Flex
      bg="gray.800"
      borderWidth="1px"
      borderColor="gray.700"
      borderRadius="xl"
      overflow="hidden"
      maxW="150px"
      minW="150px"
      m={2}
      flex="1"
      flexDirection="column"
      transition="all 0.2s ease-in-out"
      _hover={{
        transform: "scale(1.04)",
        borderColor: "red.600",
        boxShadow: "0 8px 20px -6px rgba(229, 62, 62, 0.4)",
      }}
      boxShadow="md"
    >
      <Link
        as={RouterLink}
        to={`/MovieDetails/${id}`}
        _hover={{ textDecoration: "none" }}
      >
        <Box position="relative" h="215px" bg="gray.900">
          {poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w200${poster_path}`}
              alt={title}
              w="100%"
              h="100%"
              objectFit="cover"
            />
          ) : (
            <Flex
              h="100%"
              alignItems="center"
              justifyContent="center"
              bg="gray.800"
              color="gray.500"
            >
              <Text fontSize="xs" fontWeight="semibold">
                Afiş Yok
              </Text>
            </Flex>
          )}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bgGradient="linear(to-t, gray.900 80%, transparent)"
            p={2}
            textAlign="center"
          >
            <Badge
              colorScheme={getVoteColorScheme(vote_average)}
              fontSize="10px"
              px={2}
              borderRadius="md"
            >
              {vote_average ? vote_average.toFixed(1) : "N/A"}
            </Badge>
          </Box>
        </Box>
        <Box p={3}>
          <Text
            fontWeight="bold"
            fontSize="sm"
            color="white"
            mb={1}
            noOfLines={1}
          >
            {title}
          </Text>
          <Text fontSize="xs" color="gray.400">
            {release_date ? release_date.split("-")[0] : ""}
          </Text>
        </Box>
      </Link>
    </Flex>
  );
};

export default SimilarCard;
