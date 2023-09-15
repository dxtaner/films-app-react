import { Box, Button, Image, Stack, Text } from "@chakra-ui/react";
import { MenuItems } from "./menuItems.js";
import { useNavigate } from "react-router-dom";

export const MenuLinks = ({ isOpen, accountInfo, isAuth }) => {
  const navigate = useNavigate();

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}>
      <Stack
        spacing={5}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}>
        <MenuItems to="/">
          <Text>Films</Text>
        </MenuItems>
        <MenuItems to="/films">
          <Text>Films</Text>
        </MenuItems>
        {isAuth ? (
          <>
            <MenuItems to="/favorites">
              <Text>Favori Filmlerim</Text>
            </MenuItems>
            <Image
              borderRadius="full"
              src={`https://image.tmdb.org/t/p/original${accountInfo?.avatar_path}`}
              boxSize="36px"
            />
          </>
        ) : (
          <Button
            onClick={() => navigate("/auth/login")}
            size="sm"
            bg="red.600"
            _hover={{ bg: "red.700" }}>
            Login
          </Button>
        )}
      </Stack>
    </Box>
  );
};
