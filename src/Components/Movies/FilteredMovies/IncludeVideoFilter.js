import React from "react";
import { Select, FormControl, FormLabel, Box, Divider } from "@chakra-ui/react";

const IncludeVideoFilter = ({ queryParams, onFilterChange }) => {
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
          Video İçeriği
        </FormLabel>
        <Divider my={2} borderColor="teal.500" />

        <Select
          value={queryParams.include_video.toString()}
          onChange={(e) =>
            onFilterChange("include_video", e.target.value === "true")
          }
          size="md"
          borderRadius="md"
          borderColor="gray.300"
          _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
          _hover={{ borderColor: "gray.400" }}
          backgroundColor="white"
          color="gray.800">
          <option value="true">Evet</option>
          <option value="false">Hayır</option>
        </Select>
      </FormControl>
    </Box>
  );
};

export default IncludeVideoFilter;
