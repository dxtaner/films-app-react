import React from "react";
import { Input, Text } from "@chakra-ui/react";

const StartDateFilter = ({ queryParams, onFilterChange }) => {
  const handleStartDateChange = (e) => {
    onFilterChange("primary_release_date.gte", e.target.value);
  };

  return (
    <div>
      <Text fontSize="sm" fontWeight="semibold">
        Başlangıç Tarihi
      </Text>
      <Input
        type="date"
        value={queryParams.primary_release_date.gte || ""}
        onChange={handleStartDateChange}
        size="xs"
        borderWidth="1px"
        borderRadius="sm"
        borderColor="gray.300"
        _focus={{ borderColor: "blue.400", boxShadow: "none" }}
        maxWidth="100px"
      />
    </div>
  );
};

export default StartDateFilter;
