import React from "react";
import { Input, Flex, FormControl, FormLabel } from "@chakra-ui/react";

const MaxVoteCountFilter = ({ queryParams, onFilterChange }) => {
  return (
    <FormControl>
      <FormLabel fontSize="sm" fontWeight="semibold">
        Oy Sayısı (Max)
      </FormLabel>
      <Flex alignItems="center">
        <Input
          type="number"
          value={queryParams["vote_count.lte"] || ""}
          onChange={(e) => onFilterChange("vote_count.lte", e.target.value)}
          placeholder="0 ile 10 arası bir değer girin"
          size="xs"
        />
      </Flex>
    </FormControl>
  );
};

export default MaxVoteCountFilter;
