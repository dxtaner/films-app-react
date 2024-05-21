import React from "react";
import { Input, FormControl, FormLabel, Box, Divider } from "@chakra-ui/react";

const PrimaryReleaseYearFilter = ({ queryParams, onFilterChange }) => {
  const handleYearChange = (e) => {
    const year = e.target.value;
    onFilterChange("primary_release_year", year);
  };

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      borderColor="gray.200"
      _hover={{ boxShadow: "lg", borderColor: "gray.300" }}>
      <FormControl>
        <FormLabel fontSize="md" fontWeight="semibold" mb={1} color="teal.600">
          Yıl
        </FormLabel>
        <Divider my={2} borderColor="teal.500" />

        <Input
          type="number"
          value={queryParams.primary_release_year || ""}
          onChange={handleYearChange}
          size="sm"
          borderRadius="md"
          borderColor="gray.300"
          _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
          _hover={{ borderColor: "gray.400" }}
          backgroundColor="white"
          color="gray.800"
          placeholder="Yıl"
          min={1900}
          max={new Date().getFullYear()}
        />
      </FormControl>
    </Box>
  );
};

export default PrimaryReleaseYearFilter;
