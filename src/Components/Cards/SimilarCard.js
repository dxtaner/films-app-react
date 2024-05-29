import React from "react";
import { Box, Text, Image, Flex, Link, Badge } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SimilarCard = ({ movie }) => {
  const { id, title, poster_path, release_date, vote_average } = movie;
  const defaultImageUrl = "https://via.placeholder.com/150";

  const getColorFromVote = (vote) => {
    if (vote >= 7) {
      return "green";
    } else if (vote >= 5) {
      return "yellow";
    } else {
      return "red";
    }
  };

  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      maxW="150px"
      m={2}
      p={2}
      flex="1"
      flexDirection="column"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.03)" }}
      minW="150px"
      boxShadow="md">
      <Link
        as={RouterLink}
        to={`/MovieDetails/${id}`}
        _hover={{ textDecoration: "none" }}>
        <Box position="relative">
          <Image
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w200/${poster_path}`
                : defaultImageUrl
            }
            alt={title}
            maxW="100%"
            fallbackSrc={defaultImageUrl}
          />
          <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            bg="rgba(0, 0, 0, 0.6)"
            p="2"
            color="white"
            fontSize="md"
            textAlign="center">
            <Badge colorScheme={getColorFromVote(vote_average)} mb="1">
              {vote_average.toFixed(2)}
            </Badge>
          </Box>
        </Box>
        <Box p="2">
          <Text fontWeight="semibold" fontSize="md" mb="1" isTruncated>
            {title}
          </Text>
          <Text fontSize="sm">{release_date}</Text>
        </Box>
      </Link>
    </Flex>
  );
};

export default SimilarCard;
