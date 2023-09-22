import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaFlag } from "react-icons/fa";

const OriginCountryFilter = ({ queryParams, onFilterChange }) => {
  return (
    <InputGroup size="xs">
      <InputLeftElement pointerEvents="none">
        <FaFlag color="gray.300" />
      </InputLeftElement>
      <Input
        type="text"
        value={queryParams.with_origin_country || ""}
        onChange={(e) => onFilterChange("with_origin_country", e.target.value)}
        placeholder="Ülke"
      />
    </InputGroup>
  );
};

export default OriginCountryFilter;
