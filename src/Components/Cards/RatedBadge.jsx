import React from "react";
import { Badge, Flex, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const RatedBadge = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < rating / 2; i++) {
    stars.push(<Icon key={i} as={StarIcon} color="yellow.400" boxSize={3.5} />);
  }

  return (
    <Flex mt={2} alignItems="center" gap={2}>
      <Badge
        variant="subtle"
        colorScheme="yellow"
        fontSize="xs"
        px={2}
        py={0.5}
        borderRadius="md"
        fontWeight="semibold"
      >
        Puanınız
      </Badge>
      <Flex alignItems="center" gap={0.5}>
        {stars}
      </Flex>
    </Flex>
  );
};

export default RatedBadge;
