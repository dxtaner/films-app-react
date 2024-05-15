import React from "react";
import { Text, VStack, Heading, Box } from "@chakra-ui/react";

function Biography({ biography }) {
  return (
    <Box p={4} borderRadius="lg" bg="gray.100">
      <VStack spacing={4} align="start">
        <Heading as="h2" size="lg" mb={2}>
          Biyografi
        </Heading>
        <Text fontSize="lg" color="gray.600">
          {biography}
        </Text>
      </VStack>
    </Box>
  );
}

export default Biography;
