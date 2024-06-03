import React from "react";
import { Button } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const ToggleButton = ({ isCastPage, handleTogglePage }) => {
  return (
    <Button
      colorScheme="blue"
      onClick={handleTogglePage}
      mt={4}
      leftIcon={isCastPage ? <ArrowBackIcon /> : <ArrowForwardIcon />}
      rightIcon={isCastPage ? <ArrowForwardIcon /> : <ArrowBackIcon />}
      fontWeight="bold"
      textTransform="uppercase"
      _hover={{ opacity: 0.8 }}>
      {isCastPage ? "Ekip" : "Oyuncular"}
    </Button>
  );
};

export default ToggleButton;
