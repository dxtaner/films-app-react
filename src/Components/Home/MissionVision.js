import React from "react";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";

function MissionVision() {
  return (
    <Stack direction="row" spacing={4}>
      <Box>
        <Heading as="h3" size="lg">
          Misyonumuz
        </Heading>
        <Text>
          Sizlere en iyi film deneyimini sunmak ve en son film haberleri ile
          güncel kalmak.
        </Text>
      </Box>
      <Box>
        <Heading as="h3" size="lg">
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
