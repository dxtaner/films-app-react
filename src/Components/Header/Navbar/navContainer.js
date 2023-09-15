import { Flex } from "@chakra-ui/react";
export const NavContainer = ({ children }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p="4"
      bg="black"
      color="white"
      borderBottom="2px"
      borderColor="red.600">
      {children}
    </Flex>
  );
};
