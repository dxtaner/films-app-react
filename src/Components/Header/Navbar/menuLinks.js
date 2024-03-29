import { Box, Button, Image, Stack, Text } from "@chakra-ui/react";
import { MenuItems } from "./menuItems.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar.js";

export const MenuLinks = ({ isOpen, accountInfo, isAuth }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
        <SearchBar />
        <MenuItems to="/about">
          <Text>Site Hakkında...</Text>
        </MenuItems>
        <MenuItems to="/discoverMovies">
          <Text>Filmleri Keşfet</Text>
        </MenuItems>
        <MenuItems to="/popularPersons">
          <Text>Popüler Oyuncular</Text>
        </MenuItems>
        <MenuItems to="/popularSeries">
          <Text>Popüler Diziler</Text>
        </MenuItems>
        <MenuItems to="/topSeries">
          <Text>En İyi Diziler</Text>
        </MenuItems>
        <MenuItems to="/">
          <Text>En Yüksek Puan Alan Filmler</Text>
        </MenuItems>
        <MenuItems to="/upComingMovies">
          <Text> Yaklaşan Filmler</Text>
        </MenuItems>
        {isAuth ? (
          <div style={{ position: "relative" }}>
            <Image
              borderRadius="full"
              src={`https://image.tmdb.org/t/p/original${accountInfo?.avatar_path}`}
              boxSize="40px"
              cursor="pointer"
              onClick={toggleMenu}
            />
            {isMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "60px",
                  right: "0",
                  background: "white",
                  boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                  zIndex: "1",
                }}>
                <Link
                  to="/myFavoriteMovies"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={closeMenu}>
                  Favori Filmlerim
                </Link>
                <Link
                  to="/WatchListMovies"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={closeMenu}>
                  İzleme Listemdeki Filmlerim
                </Link>
                {/* Diğer menü öğelerini buraya ekleyebilirsiniz */}
              </div>
            )}
          </div>
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
