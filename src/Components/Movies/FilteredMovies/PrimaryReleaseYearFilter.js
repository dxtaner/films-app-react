import React from "react";
import { Input, FormControl, FormLabel, Box, Divider } from "@chakra-ui/react";

const PrimaryReleaseYearFilter = ({ queryParams, onFilterChange }) => {
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
          Yıl
        </FormLabel>
        <Divider my={2} borderColor="gray.800" />

        <Input
          type="number"
          value={queryParams.primary_release_year || ""}
          onChange={(e) =>
            onFilterChange("primary_release_year", e.target.value)
          }
          size="sm"
          borderRadius="lg"
          borderColor="gray.700"
          bg="gray.800"
          color="white"
          _placeholder={{ color: "gray.500" }}
          _focus={{ borderColor: "red.500", boxShadow: "0 0 0 1px #E53E3E" }}
          _hover={{ borderColor: "gray.600" }}
          placeholder="Örn: 2024"
          min={1900}
          max={new Date().getFullYear()}
        />
      </FormControl>
    </Box>
  );
};

export default PrimaryReleaseYearFilter;
