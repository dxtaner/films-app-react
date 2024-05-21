import React from "react";
import { Select, FormControl, FormLabel, Box, Divider } from "@chakra-ui/react";

const CertificationFilter = ({ queryParams, onFilterChange }) => {
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
        <FormLabel fontSize="md" fontWeight="bold" mb={2} color="teal.600">
          Sertifika
        </FormLabel>
        <Divider my={2} borderColor="teal.500" />

        <Select
          value={queryParams.certification}
          onChange={(e) => onFilterChange("certification", e.target.value)}
          size="md"
          borderRadius="md"
          borderColor="gray.300"
          _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
          _hover={{ borderColor: "gray.400" }}
          backgroundColor="white"
          color="gray.800">
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CertificationFilter;
