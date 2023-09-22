import React from "react";
import { Select } from "@chakra-ui/react";
import renderSelectOptions from "./renderSelectOptions";

const CertificationFilter = ({ queryParams, onFilterChange }) => {
  return (
    <Select
      value={queryParams.certification}
      onChange={(e) => onFilterChange("certification", e.target.value)}
      size="xs"
      borderWidth="1px"
      borderRadius="sm"
      borderColor="gray.300"
      _focus={{ borderColor: "blue.400", boxShadow: "none" }}
      maxWidth="100px">
      {renderSelectOptions([
        { id: "PG-13", name: "PG-13" },
        { id: "R", name: "R" },
      ])}
    </Select>
  );
};

export default CertificationFilter;
