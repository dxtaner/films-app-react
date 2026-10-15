import React from "react";
import { Box, Text, Button, VStack, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { WarningTwoIcon } from "@chakra-ui/icons";

const NotFound = () => {
  return (
    <VStack textAlign="center" justify="center" minH="60vh" px={4} spacing={6}>
      <Icon as={WarningTwoIcon} boxSize={16} color="blue.500" />
      <Box maxW="500px">
        <Text fontSize="4xl" fontWeight="bold" mb={2} color="white">
          404 - Sayfa Bulunamadı
        </Text>
        <Text fontSize="lg" color="gray.400" mb={6}>
          Üzgünüz, aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici
          olarak kullanılamıyor olabilir.
        </Text>
        <Button
          colorScheme="blue"
          as={Link}
          to="/"
          size="lg"
          px={8}
          fontWeight="bold"
          rounded="full"
          boxShadow="lg"
          _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
          transition="all 0.2s"
        >
          Anasayfa'ya Dön
        </Button>
      </Box>
    </VStack>
  );
};

export default NotFound;
