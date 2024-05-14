import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box textAlign="center" mt={20} mx="auto" maxW="400px">
      <Text fontSize="3xl" fontWeight="bold" mb={4}>
        Sayfa Bulunamadı
      </Text>
      <Text fontSize="lg" mb={8} color="gray.500">
        Üzgünüz, aradığınız sayfayı bulamadık.
      </Text>
      <Button
        colorScheme="blue"
        as={Link}
        to="/"
        px={8}
        py={4}
        mb={4}
        fontSize="xl"
        fontWeight="bold"
        rounded="full"
        _hover={{ bg: "blue.600" }}
        _focus={{ outline: "none" }}>
        Anasayfa'ya Git
      </Button>
    </Box>
  );
};

export default NotFound;
