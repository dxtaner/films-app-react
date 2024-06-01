import React from "react";
import { Badge } from "@chakra-ui/react";

const VoteBadge = ({ voteAverage }) => {
  const getVoteColor = () => {
    const newVoteAverage = voteAverage * 10;
    if (newVoteAverage >= 70) {
      return "green";
    } else if (newVoteAverage >= 55) {
      return "yellow";
    } else if (newVoteAverage >= 40) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <Badge
      position="absolute"
      top="2"
      right="2"
      bg={getVoteColor()}
      color="white"
      fontSize="md"
      p="1"
      rounded="md">
      {voteAverage.toFixed(1)}
    </Badge>
  );
};

export default VoteBadge;
