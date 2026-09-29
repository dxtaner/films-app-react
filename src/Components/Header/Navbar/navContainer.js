import React from "react";
import { Flex } from "@chakra-ui/react";

export const NavContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap" // Mobil menü açıldığında alt satıra geçebilmesi için şart
      w="100%"
      px={8}
      py={4}
      bg="gray.900"
      color="white"
      borderBottom="3px solid"
      borderColor="red.600"
      position="relative"
      zIndex={100}
      {...props}
    >
      {children}
    </Flex>
  );
};
