import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaCalendar } from "react-icons/fa";

const YearFilter = ({ queryParams, onFilterChange }) => {
  return (
    <InputGroup size="sm" maxW="160px">
      <InputLeftElement pointerEvents="none" color="gray.500">
        <FaCalendar />
      </InputLeftElement>
      <Input
        type="number"
        value={queryParams.year || ""}
        onChange={(e) => onFilterChange("year", e.target.value)}
        placeholder="Yıl"
        borderRadius="lg"
        borderColor="gray.700"
        bg="gray.800"
        color="white"
        _placeholder={{ color: "gray.500" }}
        _hover={{ borderColor: "gray.600" }}
        _focus={{
          borderColor: "red.500",
          boxShadow: "0 0 0 1px #E53E3E",
        }}
      />
    </InputGroup>
  );
};

export default YearFilter;
