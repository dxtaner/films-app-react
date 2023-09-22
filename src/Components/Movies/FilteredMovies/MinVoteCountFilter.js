import React from "react";
import { Input, Flex, FormControl, FormLabel } from "@chakra-ui/react";

const MinVoteCountFilter = ({ queryParams, onFilterChange }) => {
  return (
    <FormControl>
      <FormLabel fontSize="sm" fontWeight="semibold">
        Oy Sayısı (Min)
      </FormLabel>
      <Flex alignItems="center">
        <Input
          type="number"
          value={queryParams["vote_count.gte"] || ""}
          onChange={(e) => onFilterChange("vote_count.gte", e.target.value)}
          placeholder="0 ile 10 arası bir değer girin"
          size="xs"
        />
      </Flex>
    </FormControl>
  );
};

export default MinVoteCountFilter;
