import React from "react";
import { Select, Box, Text, Divider } from "@chakra-ui/react";
import genreOptions from "../genreOptions";

const WithoutGenreFilter = ({ queryParams, onFilterChange }) => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      borderColor="gray.200"
      _hover={{ boxShadow: "lg", borderColor: "gray.300" }}>
      <Text fontSize="md" fontWeight="bold" color="teal.600">
        Türleri Kaldır
      </Text>
      <Divider my={2} borderColor="teal.500" />
      <Select
        value={queryParams.without_genres || ""}
        onChange={(e) => onFilterChange("without_genres", e.target.value)}
        size="md"
        borderWidth="1px"
        borderRadius="md"
        borderColor="gray.300"
        _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }}
        _hover={{ borderColor: "gray.400" }}
        backgroundColor="white"
        color="gray.800"
        placeholder="Seçmeme">
        {genreOptions.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default WithoutGenreFilter;
