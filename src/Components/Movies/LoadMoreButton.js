import React from "react";
import { Button } from "@chakra-ui/react";

const LoadMoreButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} marginTop={4} colorScheme="teal">
      Daha Fazla Yükle
    </Button>
  );
};

export default LoadMoreButton;
