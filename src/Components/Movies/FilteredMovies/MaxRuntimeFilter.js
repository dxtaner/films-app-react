import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa";

const MaxRuntimeFilter = ({ queryParams, onFilterChange }) => {
  return (
    <InputGroup size="xs">
      <InputLeftElement pointerEvents="none">
        <FaClock color="gray.400" />
      </InputLeftElement>
      <Input
        type="number"
        value={queryParams["with_runtime.lte"] || ""}
        onChange={(e) => onFilterChange("with_runtime.lte", e.target.value)}
        placeholder="Süre (Dakika) (Maksimum)"
        size="xs"
        fontSize="sm"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
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

export default MaxRuntimeFilter;
