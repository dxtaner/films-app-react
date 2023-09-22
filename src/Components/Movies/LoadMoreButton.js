import React from "react";
import { Button, Center, Spinner } from "@chakra-ui/react";

const LoadMoreButton = ({ onClick, status }) => {
  if (status === "loading") {
    return (
      <Center mt={6}>
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }
  return (
    <Button onClick={onClick} marginTop={4} colorScheme="teal">
      Daha Fazla Yükle
    </Button>
  );
};

export default LoadMoreButton;
