import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

const SortButtons = ({ sortBy, setSortBy }) => {
  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <SortButton
        label="Popülerlik"
        value="popularity"
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <SortButton
        label="Yayın Tarihi"
        value="release_date"
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <SortButton
        label="Oy Sayısı"
        value="vote_count"
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </ButtonGroup>
  );
};

const SortButton = ({ label, value, sortBy, setSortBy }) => {
  const isActive = sortBy === value;

  return (
    <Button
      colorScheme={isActive ? "teal" : "gray"}
      onClick={() => setSortBy(value)}>
      {label}
    </Button>
  );
};

export default SortButtons;
