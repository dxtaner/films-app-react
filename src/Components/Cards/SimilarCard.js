import { Box, Image, Text, Badge, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const SimilarCard = ({ movie }) => {
  const navigate = useNavigate();

  if (!movie) {
    return null;
  }

  const { id, title, poster_path, release_date, vote_average } = movie;

  const handleClick = () => {
    navigate(`/MovieDetails/${id}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 7) {
      return "green";
    }

    if (rating >= 5) {
      return "yellow";
    }

    return "red";
  };

  return (
    <Box
      minW="180px"
      maxW="180px"
      bg="gray.800"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "2xl",
      }}
      onClick={handleClick}
    >
      <Box position="relative" w="100%" h="270px" bg="gray.700">
        {poster_path ? (
          <Image
            src={`${IMAGE_BASE_URL}${poster_path}`}
            alt={title || "Film posteri"}
            w="100%"
            h="100%"
            objectFit="cover"
            loading="lazy"
          />
        ) : (
          <Box
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.700"
          >
            <Text color="gray.400" fontSize="sm" textAlign="center" px={3}>
              Poster not found
            </Text>
          </Box>
        )}

        {vote_average !== undefined && (
          <Badge
            position="absolute"
            top={2}
            right={2}
            colorScheme={getRatingColor(vote_average)}
            borderRadius="md"
            px={2}
            py={1}
            fontSize="sm"
          >
            {Number(vote_average).toFixed(1)}
          </Badge>
        )}
      </Box>

      <VStack align="stretch" spacing={1} p={3}>
        <Text color="white" fontWeight="bold" fontSize="md" noOfLines={2}>
          {title || "The movie title could not be found"}
        </Text>

        {release_date && (
          <Text color="gray.400" fontSize="sm">
            {release_date.substring(0, 4)}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default SimilarCard;
