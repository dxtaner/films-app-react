import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function ExploreButton() {
  const navigate = useNavigate();

  return (
    <Button
      colorScheme="red"
      bg="red.600"
      size="lg"
      px={8}
      borderRadius="full"
      fontWeight="bold"
      letterSpacing="wide"
      rightIcon={<FiArrowRight />}
      onClick={() => navigate("/")}
      _hover={{
        bg: "red.500",
        transform: "translateY(-2px)",
        boxShadow: "0 10px 20px -10px rgba(229, 62, 62, 0.5)",
      }}
      _active={{ bg: "red.700", transform: "translateY(0)" }}
      transition="all 0.2s ease"
    >
      Daha Fazla Keşfet
    </Button>
  );
}

export default ExploreButton;
