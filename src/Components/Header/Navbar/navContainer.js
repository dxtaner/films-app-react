import { Flex } from "@chakra-ui/react";
export const NavContainer = ({ children }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p="5"
      bg="gray.800"
      color="white"
      borderBottom="5px"
      borderColor="red.800">
      {children}
    </Flex>
  );
};
