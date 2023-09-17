import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ExploreButton() {
  const navigate = useNavigate();

  return (
    <Button
      colorScheme="blue"
      size="lg"
      mb={4}
      onClick={() => navigate("/")}
      _hover={{ bg: "blue.600" }} // Farenin üstüne gelindiğinde arka plan rengi
      _active={{ bg: "blue.700" }} // Tıklama sırasında arka plan rengi
      _focus={{ outline: "none" }} // Odaklandığında varsayılan vurgu rengini kaldırır
      transition="background-color 0.2s ease-in-out" // Geçiş efekti ekler
    >
      Daha Fazla Keşfet
    </Button>
  );
}

export default ExploreButton;
