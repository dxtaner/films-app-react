import React from "react";
import { Select, FormControl, FormLabel, Box, Divider } from "@chakra-ui/react";

const SortByFilter = ({ queryParams, onFilterChange }) => {
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
          Sıralama
        </FormLabel>
        <Divider my={2} borderColor="teal.500" />

        <Select
          value={queryParams.sort_by}
          onChange={(e) => onFilterChange("sort_by", e.target.value)}
          size="md"
          borderWidth="2px"
          borderRadius="md"
          borderColor="gray.300"
          _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
          _hover={{ borderColor: "gray.400" }}
          backgroundColor="white"
          color="gray.800">
          <option value="popularity.desc">Popülerlik (Azalan)</option>
          <option value="popularity.asc">Popülerlik (Artan)</option>
          <option value="revenue.desc">Gelir (Azalan)</option>
          <option value="revenue.asc">Gelir (Artan)</option>
          <option value="primary_release_date.desc">
            İlk Yayın Tarihi (Azalan)
          </option>
          <option value="primary_release_date.asc">
            İlk Yayın Tarihi (Artan)
          </option>
          <option value="vote_average.desc">Oylama Ortalaması (Azalan)</option>
          <option value="vote_average.asc">Oylama Ortalaması (Artan)</option>
          <option value="vote_count.desc">Oy Sayısı (Azalan)</option>
          <option value="vote_count.asc">Oy Sayısı (Artan)</option>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortByFilter;
