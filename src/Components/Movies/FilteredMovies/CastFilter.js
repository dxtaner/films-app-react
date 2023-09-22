import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";

const CastFilter = ({ queryParams, onFilterChange }) => {
  return (
    <InputGroup size="xs">
      <InputLeftElement pointerEvents="none">
        <FaUsers color="gray.400" />
      </InputLeftElement>
      <Input
        type="text"
        value={queryParams.with_cast || ""}
        onChange={(e) => onFilterChange("with_cast", e.target.value)}
        placeholder="Oyuncular (virgülle ayrılmış)"
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

export default CastFilter;
