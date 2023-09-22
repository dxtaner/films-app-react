import React from "react";
import { Select } from "@chakra-ui/react";
import renderSelectOptions from "./renderSelectOptions";

const IncludeVideoFilter = ({ queryParams, onFilterChange }) => {
  return (
    <Select
      value={queryParams.include_video.toString()}
      onChange={(e) =>
        onFilterChange("include_video", e.target.value === "true")
      }
      size="xs"
      borderWidth="1px"
      borderRadius="sm"
      borderColor="gray.300"
      _focus={{ borderColor: "blue.400", boxShadow: "none" }}
      maxWidth="150px">
      {renderSelectOptions([
        { id: "true", name: "Evet" },
        { id: "false", name: "Hayır" },
      ])}
    </Select>
  );
};

export default IncludeVideoFilter;
