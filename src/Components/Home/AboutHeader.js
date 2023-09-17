import React from "react";
import { Heading } from "@chakra-ui/react";

function AboutHeader() {
  return (
    <Heading
      as="h2"
      size="xl"
      mb={4}
      color="teal.900" // Başlığın metin rengi
      fontWeight="bold" // Kalın metin
      textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)" // Metin gölgesi
      textAlign="center" // Metin ortalanmış olarak
    >
      Hoş Geldiniz!
    </Heading>
  );
}

export default AboutHeader;
