import React from "react";
import { Select } from "@chakra-ui/react";
import renderSelectOptions from "./renderSelectOptions";

const SortByFilter = ({ queryParams, onFilterChange }) => {
  return (
    <Select
      value={queryParams.sort_by}
      onChange={(e) => onFilterChange("sort_by", e.target.value)}
      size="xs"
      borderWidth="2px"
      borderRadius="md"
      borderColor="gray.300"
      _focus={{ borderColor: "blue.400", boxShadow: "none" }}
      _hover={{ borderColor: "gray.400" }}
      maxWidth="200px">
      {renderSelectOptions([
        { id: "popularity.desc", name: "Popülerlik (Azalan)" },
        { id: "popularity.asc", name: "Popülerlik (Artan)" },
        { id: "revenue.desc", name: "Gelir (Azalan)" },
        { id: "revenue.asc", name: "Gelir (Artan)" },
        {
          id: "primary_release_date.desc",
          name: "İlk Yayın Tarihi (Azalan)",
        },
        {
          id: "primary_release_date.asc",
          name: "İlk Yayın Tarihi (Artan)",
        },
        { id: "vote_average.desc", name: "Oylama Ortalaması (Azalan)" },
        { id: "vote_average.asc", name: "Oylama Ortalaması (Artan)" },
        { id: "vote_count.desc", name: "Oy Sayısı (Azalan)" },
        { id: "vote_count.asc", name: "Oy Sayısı (Artan)" },
      ])}
    </Select>
  );
};

export default SortByFilter;
