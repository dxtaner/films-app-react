import React from "react";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";

function MissionVision() {
  return (
    <Stack direction={{ base: "column", md: "row" }} spacing={8} align="start">
      <Box flex="1">
        <Heading as="h3" size="lg" mb={2}>
          Misyonumuz
        </Heading>
        <Text>
          Sizlere en iyi film deneyimini sunmak ve en son film haberleri ile
          güncel kalmak.
        </Text>
      </Box>
      <Box flex="1">
        <Heading as="h3" size="lg" mb={2}>
          Vizyonumuz
        </Heading>
        <Text>
          Sinema dünyasının geleceğini şekillendirmek ve en iyi film içeriğini
          sağlamak.
        </Text>
      </Box>
    </Stack>
  );
}

export default MissionVision;
