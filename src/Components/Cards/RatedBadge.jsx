import React from "react";
import { Badge, Flex, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const RatedBadge = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < rating / 2; i++) {
    stars.push(<Icon key={i} as={StarIcon} color="yellow.400" boxSize={4} />);
  }

  return (
    <Flex mt="2" alignItems="center">
      <Badge
        variant="solid"
        colorScheme="yellow"
        fontSize="sm"
        textAlign="center"
        px={2}
        opacity={"0.7"}
        py={1}>
        Your Rating
      </Badge>
      <Flex ml="2" alignItems="center">
        {stars}
      </Flex>
    </Flex>
  );
};

export default RatedBadge;
