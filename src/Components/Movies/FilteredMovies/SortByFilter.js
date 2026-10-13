import React from "react";
import { Select, FormControl, FormLabel, Box, Divider } from "@chakra-ui/react";

const SortByFilter = ({ queryParams, onFilterChange }) => {
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
          Sıralama
        </FormLabel>
        <Divider my={2} borderColor="gray.800" />

        <Select
          value={queryParams.sort_by || "popularity.desc"}
          onChange={(e) => onFilterChange("sort_by", e.target.value)}
          size="sm"
          borderRadius="lg"
          borderColor="gray.700"
          bg="gray.800"
          color="white"
          _focus={{ borderColor: "red.500", boxShadow: "0 0 0 1px #E53E3E" }}
          _hover={{ borderColor: "gray.600" }}
        >
          <option
            value="popularity.desc"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            Popülerlik (Azalan)
          </option>
          <option
            value="popularity.asc"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            Popülerlik (Artan)
          </option>
          <option
            value="revenue.desc"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            Gelir (Azalan)
          </option>
          <option
            value="revenue.asc"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            Gelir (Artan)
          </option>
          <option
            value="primary_release_date.desc"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            İlk Yayın Tarihi (Azalan)
          </option>
          <option
            value="primary_release_date.asc"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            İlk Yayın Tarihi (Artan)
          </option>
          <option
            value="vote_average.desc"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            Oylama Ortalaması (Azalan)
          </option>
          <option
            value="vote_average.asc"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            Oylama Ortalaması (Artan)
          </option>
          <option
            value="vote_count.desc"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            Oy Sayısı (Azalan)
          </option>
          <option
            value="vote_count.asc"
            style={{ backgroundColor: "#1A202C", color: "white" }}
          >
            Oy Sayısı (Artan)
          </option>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortByFilter;
