import React from "react";
import { Input, FormControl, FormLabel, Box, Divider } from "@chakra-ui/react";

const EndDateFilter = ({ queryParams, onFilterChange }) => {
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
          Bitiş Tarihi
        </FormLabel>
        <Divider my={2} borderColor="gray.800" />

        <Input
          type="date"
          value={queryParams["primary_release_date.lte"] || ""}
          onChange={(e) =>
            onFilterChange("primary_release_date.lte", e.target.value)
          }
          size="sm"
          borderRadius="lg"
          borderColor="gray.700"
          bg="gray.800"
          color="white"
          colorScheme="dark"
          _focus={{ borderColor: "red.500", boxShadow: "0 0 0 1px #E53E3E" }}
          _hover={{ borderColor: "gray.600" }}
        />
      </FormControl>
    </Box>
  );
};

export default EndDateFilter;
