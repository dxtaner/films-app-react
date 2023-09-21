import { Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import nullImage from "../NullImage/null.png";

const MotionBox = motion.div;

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const showDetails = () => {
    navigate(`/movieDetails/${movie.id}`, { state: movie });
  };

  const { poster_path } = movie;
  let backdropImageUrl = "";

  if (poster_path && poster_path !== "null") {
    backdropImageUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
  } else {
    // Eğer backdrop_path boş, null veya "null" ise varsayılan bir URL veya başka bir işlem yapabiliriz
    backdropImageUrl = nullImage;
  }

  return (
    <Box
      cursor="pointer"
      m={3}
      p={3}
      width={{ base: "200px", md: "250px" }}
      borderRadius="lg"
      boxShadow="lg"
      backgroundColor="white" // Beyaz arka plan
      transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "xl",
      }}>
      <MotionBox whileHover={{ scale: 1.1 }}>
        <Image
          src={backdropImageUrl}
          alt={movie.title}
          onClick={showDetails}
          borderRadius="lg"
        />
      </MotionBox>
      <Text
        mt={6}
        fontWeight="semibold"
        fontSize="lg"
        textAlign="center"
        lineHeight="shorter"
        noOfLines={2}
        color="teal.600"
        _hover={{ color: "teal.800" }}>
        {movie.title}
      </Text>
    </Box>
  );
};

export default MovieCard;
