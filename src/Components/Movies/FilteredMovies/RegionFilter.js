import React from "react";
import { Input } from "@chakra-ui/react";

const RegionFilter = ({ queryParams, onFilterChange }) => {
  const handleRegionChange = (e) => {
    const newValue = e.target.value;
    onFilterChange("region", newValue);
  };

  return (
    <Input
      type="text"
      value={queryParams.region || ""}
      onChange={handleRegionChange}
      size="xs"
      borderWidth="1px"
      borderRadius="sm"
      borderColor="gray.300"
      _focus={{ borderColor: "blue.400", boxShadow: "none" }}
      maxWidth="150px"
      placeholder="Bölge"
    />
  );
};

export default RegionFilter;
