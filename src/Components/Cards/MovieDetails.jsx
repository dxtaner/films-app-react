import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MovieDetails = ({ movie }) => {
  return (
    <Box p={3}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}>
        <Text
          fontSize="xl"
          fontWeight="bold"
          mb="2"
          _hover={{ color: "teal.500" }}
          transition="color 0.3s ease">
          {movie.title}
        </Text>
        <Text fontSize="sm" color="gray.600" mb="2">
          {movie.release_date}
        </Text>
      </motion.div>
    </Box>
  );
};

export default MovieDetails;
