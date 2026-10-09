import React from "react";
import { Select, FormControl, FormLabel, Box, Divider } from "@chakra-ui/react";

const IncludeAdultFilter = ({ queryParams, onFilterChange }) => {
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
          Yetişkin İçeriği
        </FormLabel>
        <Divider my={2} borderColor="gray.800" />

        <Select
          value={queryParams.include_adult ? "true" : "false"}
          onChange={(e) =>
            onFilterChange("include_adult", e.target.value === "true")
          }
          size="sm"
          borderRadius="lg"
          borderColor="gray.700"
          bg="gray.800"
          color="white"
          _focus={{ borderColor: "red.500", boxShadow: "0 0 0 1px #E53E3E" }}
          _hover={{ borderColor: "gray.600" }}
        >
          <option
            value="false"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            Hayır
          </option>
          <option
            value="true"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            Evet
          </option>
        </Select>
      </FormControl>
    </Box>
  );
};

export default IncludeAdultFilter;
