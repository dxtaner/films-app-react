import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaCalendar } from "react-icons/fa";

const YearFilter = ({ queryParams, onFilterChange }) => {
  return (
    <InputGroup size="xs">
      <InputLeftElement pointerEvents="none">
        <FaCalendar color="gray.400" />
      </InputLeftElement>
      <Input
        type="number"
        value={queryParams.year || ""}
        onChange={(e) => onFilterChange("year", e.target.value)}
        placeholder="Yıl"
        size="xs"
        fontSize="sm"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        maxWidth="150px"
        _hover={{
          borderColor: "gray.300",
        }}
        _focus={{
          borderColor: "blue.400",
          boxShadow: "none",
        }}
      />
    </InputGroup>
  );
};

export default YearFilter;
