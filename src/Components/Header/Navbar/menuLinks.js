import {
  Box,
  Button,
  Avatar,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MenuItems } from "./menuItems.js";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const MenuLinks = ({ isOpen, accountInfo, isAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
        <MenuItems
          to="/About"
          style={{ color: location.pathname === "/About" ? "blue" : "black" }}>
          <Text>Site Hakkında...</Text>
        </MenuItems>
        <MenuItems
          to="/DiscoverMovies"
          style={{
            color: location.pathname === "/DiscoverMovies" ? "blue" : "black",
          }}>
          <Text>Filmleri Keşfet</Text>
        </MenuItems>
        <MenuItems
          to="/PopularPersons"
          style={{
            color: location.pathname === "/PopularPersons" ? "blue" : "black",
          }}>
          <Text>Popüler Oyuncular</Text>
        </MenuItems>
        <MenuItems
          to="/PopularSeries"
          style={{
            color: location.pathname === "/PopularSeries" ? "blue" : "black",
          }}>
          <Text>Popüler Diziler</Text>
        </MenuItems>
        <MenuItems
          to="/TopSeries"
          style={{
            color: location.pathname === "/TopSeries" ? "blue" : "black",
          }}>
          <Text>En İyi Diziler</Text>
        </MenuItems>
        <MenuItems
          to="/"
          style={{ color: location.pathname === "/" ? "blue" : "black" }}>
          <Text>En Yüksek Puan Alan Filmler</Text>
        </MenuItems>
        <MenuItems
          to="/UpComingMovies"
          style={{
            color: location.pathname === "/UpComingMovies" ? "blue" : "black",
          }}>
          <Text>Yaklaşan Filmler</Text>
        </MenuItems>
        {isAuth ? (
          <Menu>
            <MenuButton
              as={Button}
              bg="transparent"
              _hover={{ bg: "transparent" }}
              position="relative">
              <Avatar
                src={`https://image.tmdb.org/t/p/original${accountInfo?.avatar_path}`}
                size="sm"
                cursor="pointer"
              />
            </MenuButton>
            <MenuList>
              <MenuItem
                as={Link}
                to="/MyFavoriteMovies"
                _hover={{ bg: "gray.100" }}
                style={{
                  color:
                    location.pathname === "/MyFavoriteMovies"
                      ? "blue"
                      : "black",
                }}>
                Favori Filmlerim
              </MenuItem>
              <MenuItem
                as={Link}
                to="/WatchListMovies"
                _hover={{ bg: "gray.100" }}
                style={{
                  color:
                    location.pathname === "/WatchListMovies" ? "blue" : "black",
                }}>
                İzleme Listemdeki Filmlerim
              </MenuItem>
              <MenuItem
                as={Link}
                to="/MyRatingMovies"
                _hover={{ bg: "gray.100" }}
                style={{
                  color:
                    location.pathname === "/MyRatingMovies" ? "blue" : "black",
                }}>
                Oyladığım Filmlerim
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            onClick={() => navigate("/Auth/Login")}
            size="sm"
            bg="gray.100"
            color="black"
            _hover={{ bg: "gray.300" }}>
            Giriş Yap
          </Button>
        )}
      </Stack>
    </Box>
  );
};
