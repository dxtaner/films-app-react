import React from "react";
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

  const { poster_path, release_date, vote_average } = movie;
  const backdropImageUrl =
    poster_path && poster_path !== "null"
      ? `https://image.tmdb.org/t/p/original${poster_path}`
      : nullImage;

  const getVoteColor = (voteAverage) => {
    const newVoteAverage = voteAverage * 10;
    if (newVoteAverage >= 70) {
      return "green";
    } else if (newVoteAverage >= 50) {
      return "yellow";
    } else {
      return "red";
    }
  };

  return (
    <Box
      whileHover={{ scale: 1.01 }}
      cursor="pointer"
      m={2}
      p={2}
      width={{ base: "200px", md: "250px" }}
      borderRadius="lg"
      boxShadow="lg"
      backgroundColor="white"
      transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out">
      <MotionBox whileHover={{ scale: 1.02 }}>
        <Box
          position="relative"
          borderRadius="md"
          cursor="pointer"
          overflow="hidden"
          height={{ base: "250px", md: "320px" }}>
          <Image
            src={backdropImageUrl}
            alt={movie.title}
            objectFit="cover"
            onClick={showDetails}
          />
          <Text
            fontSize="md"
            fontWeight="extrabold"
            color={getVoteColor(vote_average)}
            position="absolute"
            bottom="5px"
            right="5px"
            backgroundColor="rgba(255, 255, 255, 0.9)"
            paddingX={2}
            paddingY={1}
            borderRadius="15px"
            zIndex="1">
            {vote_average.toFixed(1) * 10}%
          </Text>
        </Box>
      </MotionBox>
      <Box p={2}>
        <Text
          fontWeight="extrabold"
          fontSize="lg"
          noOfLines={2}
          cursor="pointer"
          color="black"
          onClick={showDetails}
          _hover={{ color: "teal.500" }}>
          {movie.title}
        </Text>
        <Text
          fontSize="sm"
          color="gray.600"
          whiteSpace="nowrap"
          mt={0}
          overflow="hidden"
          textOverflow="ellipsis">
          {release_date}
        </Text>
      </Box>
    </Box>
  );
};

export default MovieCard;
