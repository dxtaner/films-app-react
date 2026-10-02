import React from "react";
import { Button, Spinner, Box, Text, Flex } from "@chakra-ui/react";

const LoadMoreButton = ({ onClick, status }) => {
  return (
    <Box mt={6} textAlign="center">
      <Flex alignItems="center" justifyItems="center" justifyContent="center">
        {status === "loading" ? (
          <Flex align="center" gap={3}>
            <Spinner size="md" color="red.600" thickness="3px" />
            <Text fontWeight="semibold" fontSize="md" color="red.400">
              Yükleniyor...
            </Text>
          </Flex>
        ) : (
          <Button
            onClick={onClick}
            colorScheme="red"
            bg="red.600"
            _hover={{ bg: "red.700" }}
            size="lg"
            px={8}
            borderRadius="xl"
            fontWeight="bold"
            boxShadow="0 4px 14px 0 rgba(229, 62, 62, 0.39)"
          >
            Daha Fazla Yükle
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default LoadMoreButton;
