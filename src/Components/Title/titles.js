import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const Title = ({ text, children }) => {
  return (
    <Box textAlign="center" position="relative" display="inline-block">
      <Heading
        as="h2"
        fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
        fontWeight="extrabold"
        letterSpacing="tight"
        color="gray.600"
      >
        {text}
      </Heading>
      <Box w="50px" h="4px" bg="red.600" borderRadius="full" mx="auto" mt={2} />
      {children}
    </Box>
  );
};

export default Title;
