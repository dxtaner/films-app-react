import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ExploreButton() {
  const navigate = useNavigate();

  return (
    <Button
      colorScheme="blue"
      size="lg"
      mb={8}
      onClick={() => navigate("/")}
      _hover={{ bg: "blue.600", color: "white" }}
      _active={{ bg: "blue.700" }}
      _focus={{ outline: "none" }}
      transition="background-color 0.2s ease-in-out">
      Daha Fazla Keşfet
    </Button>
  );
}

export default ExploreButton;
