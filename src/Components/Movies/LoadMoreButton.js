import React from "react";
import { Button, Spinner, Box, Text, Flex } from "@chakra-ui/react";

const LoadMoreButton = ({ onClick, status }) => {
  return (
    <Box mt={6} textAlign="center">
      <Flex alignItems="center" justifyItems="center">
        {status === "loading" ? (
          <>
            <Spinner size="lg" color="teal.500" mr={2} />
            <Text fontWeight="semibold" fontSize="lg" color="teal.500">
              Yükleniyor...
            </Text>
          </>
        ) : (
          <Button onClick={onClick} colorScheme="teal" size="lg">
            Daha Fazla Yükle
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default LoadMoreButton;
