import React from "react";
import { Select, Box, Divider, FormControl, FormLabel } from "@chakra-ui/react";
import genreOptions from "../genreOptions";

const WithoutGenreFilter = ({ queryParams, onFilterChange }) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="xl"
      bg="gray.900"
      borderColor="gray.800"
      boxShadow="lg"
      _hover={{ borderColor: "gray.700" }}
    >
      <FormControl>
        <FormLabel fontSize="sm" fontWeight="bold" mb={1} color="gray.200">
          Hariç Tutulacak Tür
        </FormLabel>
        <Divider my={2} borderColor="gray.800" />
        <Select
          value={queryParams.without_genres || ""}
          onChange={(e) => onFilterChange("without_genres", e.target.value)}
          size="sm"
          borderRadius="lg"
          borderColor="gray.700"
          bg="gray.800"
          color="white"
          _focus={{ borderColor: "red.500", boxShadow: "0 0 0 1px #E53E3E" }}
          _hover={{ borderColor: "gray.600" }}
          placeholder="Seçiniz..."
        >
          {genreOptions.map((genre) => (
            <option
              key={genre.id}
              value={genre.id}
              style={{ backgroundColor: "#1A202C", color: "white" }}
            >
              {genre.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default WithoutGenreFilter;
