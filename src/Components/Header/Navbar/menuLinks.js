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
        pt={[6, 6, 0, 0]}>
        <MenuItems to="/about">
          <Text>Site Hakkında...</Text>
        </MenuItems>
        <MenuItems to="/popularPersons">
          <Text>Popüler Oyuncular</Text>
        </MenuItems>
        <MenuItems to="/">
          <Text>En Yüksek Puan Alan Filmler</Text>
        </MenuItems>
        <MenuItems to="/upComingMovies">
          <Text> Yaklaşan Filmler</Text>
        </MenuItems>
        {isAuth ? (
          <>
            <MenuItems to="/favorites">
              <Text>Favori Filmlerim</Text>
            </MenuItems>
            <Image
              borderRadius="full"
              src={`https://image.tmdb.org/t/p/original${accountInfo?.avatar_path}`}
              boxSize="40px"
            />
          </>
        ) : (
          <Button
            onClick={() => navigate("/auth/login")}
            size="sm"
            bg="gray.100"
            _hover={{ bg: "gray.300" }}>
            Giriş Yap
          </Button>
        )}
      </Stack>
    </Box>
  );
};
