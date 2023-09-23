import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaLanguage } from "react-icons/fa";

const OriginalLanguageFilter = ({ queryParams, onFilterChange }) => {
  return (
    <InputGroup size="sm">
      <InputLeftElement pointerEvents="none">
        <FaLanguage color="gray.300" />
      </InputLeftElement>
      <Input
        type="text"
        value={queryParams.with_original_language || ""}
        onChange={(e) =>
          onFilterChange("with_original_language", e.target.value)
        }
        placeholder="Orijinal Dil"
        maxWidth="150px"
        size="xs"
      />
    </InputGroup>
  );
};

export default OriginalLanguageFilter;
