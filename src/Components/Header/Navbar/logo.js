import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <Box
      cursor="pointer"
      onClick={() => navigate("/")}
      userSelect="none"
      transition="opacity 0.2s"
      _hover={{ opacity: 0.8 }}
    >
      <Text
        fontSize="xl"
        fontWeight="black"
        letterSpacing="wide"
        color="red.500"
      >
        TMDB
        <Text as="span" color="white" ml={1}>
          Filmleri
        </Text>
      </Text>
    </Box>
  );
};
