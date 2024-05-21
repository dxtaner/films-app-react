import React from "react";
import { Input, FormControl, FormLabel, Box, Divider } from "@chakra-ui/react";

const EndDateFilter = ({ queryParams, onFilterChange }) => {
  const handleEndDateChange = (e) => {
    onFilterChange("primary_release_date.lte", e.target.value);
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
          Bitiş Tarihi
        </FormLabel>
        <Divider my={2} borderColor="teal.500" />

        <Input
          type="date"
          value={queryParams["primary_release_date.lte"] || ""}
          onChange={handleEndDateChange}
          size="sm"
          borderRadius="md"
          borderColor="gray.300"
          _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
          _hover={{ borderColor: "gray.400" }}
          backgroundColor="white"
          color="gray.800"
        />
      </FormControl>
    </Box>
  );
};

export default EndDateFilter;
