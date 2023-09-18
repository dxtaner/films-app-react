// components/Biography.js

import React from "react";
import { Text, VStack, Heading } from "@chakra-ui/react";

function Biography({ biography }) {
  return (
    <VStack mt={4} align="start">
      <Heading as="h2" size="lg" mb={2}>
        Biyografi
      </Heading>
      <Text fontSize="lg">{biography}</Text>
    </VStack>
  );
}

export default Biography;
