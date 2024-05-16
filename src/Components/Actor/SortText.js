import React from "react";
import { Text } from "@chakra-ui/react";

const SortText = ({ sortBy }) => {
  return (
    <Text fontSize="lg" fontWeight="bold">
      Şu anki sıralama:{" "}
      <Text as="span" color="teal.500">
        {sortBy === "popularity"
          ? "Popülerlik"
          : sortBy === "release_date"
          ? "Yayın Tarihi"
          : "Oy Sayısı"}
      </Text>
    </Text>
  );
};

export default SortText;
