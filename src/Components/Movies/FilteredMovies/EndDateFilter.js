import React from "react";
import { Input, Text } from "@chakra-ui/react";

const EndDateFilter = ({ queryParams, onFilterChange }) => {
  const handleEndDateChange = (e) => {
    onFilterChange("primary_release_date.lte", e.target.value);
  };

  return (
    <div>
      <Text fontSize="sm" fontWeight="semibold">
        Bitiş Tarihi
      </Text>
      <Input
        type="date"
        value={queryParams.primary_release_date.lte || ""}
        onChange={handleEndDateChange}
        size="xs"
        borderWidth="1px"
        borderRadius="sm"
        borderColor="gray.300"
        _focus={{ borderColor: "blue.400", boxShadow: "none" }}
        maxWidth="150px"
      />
    </div>
  );
};

export default EndDateFilter;
