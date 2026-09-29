import React from "react";
import {
  Box,
  Button,
  Avatar,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Site Hakkında", to: "/About" },
  { label: "Filmleri Keşfet", to: "/DiscoverMovies" },
  { label: "Popüler Oyuncular", to: "/PopularPersons" },
  { label: "Popüler Diziler", to: "/PopularSeries" },
  { label: "En İyi Diziler", to: "/TopSeries" },
  { label: "En Yüksek Puanlılar", to: "/" },
  { label: "Yaklaşan Filmler", to: "/UpComingMovies" },
];

export const MenuLinks = ({ isOpen, accountInfo, isAuth }) => {
  const navigate = useNavigate();

  return (
    <Box
      // Mobilde menü açıkken tam genişlik kaplar ve alt satıra geçer
      display={{ base: isOpen ? "block" : "none", xl: "block" }}
      flexBasis={{ base: "100%", xl: "auto" }}
      w={{ base: "100%", xl: "auto" }}
      mt={{ base: 4, xl: 0 }}
    >
      <Stack
        // base (mobil) modda dikey (column), masaüstünde yatay (row)
        direction={{ base: "column", xl: "row" }}
        spacing={{ base: 3, xl: 5 }}
        align={{ base: "stretch", xl: "center" }}
        justify={{ base: "center", xl: "flex-end" }}
      >
        {NAV_ITEMS.map((item) => (
          <Button
            key={item.to}
            as={NavLink}
            to={item.to}
            variant="ghost"
            fontSize="sm"
            fontWeight="medium"
            color="gray.300"
            justifyContent={{ base: "flex-start", xl: "center" }} // Mobilde sola hizalı
            _activeLink={{ color: "red.400", bg: "gray.800" }}
            _hover={{ textDecoration: "none", color: "white", bg: "gray.800" }}
          >
            {item.label}
          </Button>
        ))}

        {isAuth ? (
          <Menu placement="bottom-end">
            <MenuButton
              as={Button}
              bg="transparent"
              p={0}
              minW="auto"
              _hover={{ bg: "transparent" }}
            >
              <Avatar
                src={
                  accountInfo?.avatar_path
                    ? `https://image.tmdb.org/t/p/w500${accountInfo.avatar_path}`
                    : undefined
                }
                size="sm"
                cursor="pointer"
              />
            </MenuButton>
            <MenuList
              bg="gray.800"
              borderColor="gray.700"
              color="white"
              zIndex={200}
            >
              <MenuItem
                as={NavLink}
                to="/MyFavoriteMovies"
                bg="transparent"
                _hover={{ bg: "gray.700" }}
              >
                Favori Filmlerim
              </MenuItem>
              <MenuItem
                as={NavLink}
                to="/WatchListMovies"
                bg="transparent"
                _hover={{ bg: "gray.700" }}
              >
                İzleme Listem
              </MenuItem>
              <MenuItem
                as={NavLink}
                to="/MyRatingMovies"
                bg="transparent"
                _hover={{ bg: "gray.700" }}
              >
                Oyladığım Filmler
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            onClick={() => navigate("/Auth/Login")}
            size="sm"
            colorScheme="red"
            variant="solid"
            w={{ base: "100%", xl: "auto" }} // Mobilde tam genişlik buton
            mt={{ base: 2, xl: 0 }}
          >
            Giriş Yap
          </Button>
        )}
      </Stack>
    </Box>
  );
};
