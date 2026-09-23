import React from "react";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { FaFilm } from "react-icons/fa";

function AboutHeader() {
  return (
    <Flex align="center" gap={3}>
      <Icon as={FaFilm} boxSize={8} color="red.500" />
      <Heading
        as="h1"
        size="2xl"
        fontWeight="extrabold"
        letterSpacing="tight"
        color="gray.400"
      >
        Hoş Geldiniz!
      </Heading>
    </Flex>
  );
}

export default AboutHeader;
