import React from "react";
import { Box, Image, Text, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PopularMoviesCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;

  const defaultImageUrl = "https://via.placeholder.com/150";

  const getVoteColor = (vote) => {
    if (vote >= 7) {
      return "green";
    } else if (vote >= 5) {
      return "yellow";
    } else {
      return "red";
    }
  };

  return (
    <Box boxShadow="md" borderRadius="md" overflow="hidden">
      <Link to={`/MovieDetails/${id}`}>
        <Box position="relative">
          <Image
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : defaultImageUrl
            }
            alt={title}
            width="100%"
            height="285px"
            objectFit="cover"
          />
          <Badge
            position="absolute"
            top="4"
            right="4"
            colorScheme={getVoteColor(vote_average)}
            variant="solid"
            fontSize="sm"
            borderRadius="md"
            px="2"
            py="1">
            {vote_average.toFixed(2)}
          </Badge>
        </Box>
        <Box p={3}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            {title}
          </Text>
          <Text fontSize="md" color="gray.600" mb={2}>
            {release_date
              ? new Date(release_date).toLocaleDateString("en-US")
              : "Release Date Unknown"}
          </Text>
        </Box>
      </Link>
    </Box>
  );
};

export default PopularMoviesCard;
