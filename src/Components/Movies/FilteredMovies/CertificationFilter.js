import React from "react";
import { Select, FormControl, FormLabel, Box, Divider } from "@chakra-ui/react";

const CertificationFilter = ({ queryParams, onFilterChange }) => {
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
          Sertifika
        </FormLabel>
        <Divider my={2} borderColor="gray.800" />

        <Select
          value={queryParams.certification || ""}
          onChange={(e) => onFilterChange("certification", e.target.value)}
          size="sm"
          borderRadius="lg"
          borderColor="gray.700"
          bg="gray.800"
          color="white"
          _focus={{ borderColor: "red.500", boxShadow: "0 0 0 1px #E53E3E" }}
          _hover={{ borderColor: "gray.600" }}
        >
          <option
            value=""
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            Tümü
          </option>
          <option
            value="PG-13"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            PG-13
          </option>
          <option
            value="R"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            R
          </option>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CertificationFilter;
