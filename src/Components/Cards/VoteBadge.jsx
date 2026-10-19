import React from "react";
import { Badge } from "@chakra-ui/react";

const VoteBadge = ({ voteAverage }) => {
  const getVoteColor = () => {
    const newVoteAverage = voteAverage * 10;
    if (newVoteAverage >= 70) return "green.500";
    if (newVoteAverage >= 55) return "yellow.500";
    if (newVoteAverage >= 40) return "orange.500";
    return "red.500";
  };

  return (
    <Badge
      position="absolute"
      top="3"
      right="3"
      bg={getVoteColor()}
      color="white"
      fontSize="sm"
      fontWeight="bold"
      px={2.5}
      py={1}
      borderRadius="full"
      boxShadow="lg"
      backdropFilter="blur(4px)"
    >
      {voteAverage?.toFixed(1)}
    </Badge>
  );
};

export default VoteBadge;
