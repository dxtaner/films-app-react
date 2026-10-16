import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MovieDetails = ({ movie }) => {
  return (
    <Box p={3}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="white"
          mb={1}
          _hover={{ color: "teal.400" }}
          transition="color 0.2s ease"
          noOfLines={1}
        >
          {movie?.title}
        </Text>
        <Text fontSize="xs" color="gray.400" fontWeight="medium">
          {movie?.release_date || "Tarih Belirtilmemiş"}
        </Text>
      </motion.div>
    </Box>
  );
};

export default MovieDetails;
