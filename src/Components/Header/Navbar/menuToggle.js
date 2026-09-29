import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

export const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box
      display={{ base: "flex", xl: "none" }}
      onClick={toggle}
      cursor="pointer"
      p={2}
      borderRadius="md"
      _hover={{ bg: "gray.800" }}
      aria-label="Toggle Navigation"
    >
      <Icon
        as={isOpen ? AiOutlineClose : GiHamburgerMenu}
        w={6}
        h={6}
        color="white"
      />
    </Box>
  );
};
