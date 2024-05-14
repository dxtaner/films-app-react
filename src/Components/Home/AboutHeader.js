import React from "react";
import { Heading } from "@chakra-ui/react";

function AboutHeader() {
  return (
    <Heading
      as="h2"
      size="xl"
      mb={4}
      color="teal.900"
      fontWeight="bold"
      textAlign="center"
      _hover={{ color: "teal.700", textDecoration: "underline" }}>
      Hoş Geldiniz!
    </Heading>
  );
}

export default AboutHeader;
