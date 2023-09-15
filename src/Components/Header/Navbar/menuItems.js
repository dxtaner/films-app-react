import { Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

export const MenuItems = ({ children, to = "/" }) => {
  return (
    <Link
      _hover={{ textDecor: "none", color: "red.500" }}
      _focus={{ color: "red.500" }}
      as={ReachLink}
      to={to}>
      {children}
    </Link>
  );
};
