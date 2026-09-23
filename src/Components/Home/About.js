import React from "react";
import { Box, Container, Stack, Flex, VStack } from "@chakra-ui/react";
import MovieImage from "./MovieImage";
import AboutHeader from "./AboutHeader";
import AboutText from "./AboutText";
import MissionVision from "./MissionVision";
import ExploreButton from "./ExploreButton";

function About() {
  return (
    <Box
      bg="gray.950"
      color="white"
      minH="100vh"
      position="relative"
      py={{ base: 10, md: 20 }}
      px={4}
      overflow="hidden"
    >
      {/* Sinematik Kırmızı Vurgu Işığı */}
      <Box
        position="absolute"
        top="-10%"
        left="50%"
        transform="translateX(-50%)"
        w="600px"
        h="400px"
        bgGradient="radial(red.600 0%, transparent 70%)"
        opacity={0.15}
        filter="blur(60px)"
        pointerEvents="none"
        zIndex={0}
      />

      <Container maxW="container.lg" zIndex={1} position="relative">
        <Stack spacing={{ base: 12, md: 16 }}>
          {/* Üst Hero Bölümü */}
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap={{ base: 8, md: 12 }}
          >
            <Box flex="1" maxW={{ base: "100%", md: "48%" }}>
              <MovieImage />
            </Box>

            <VStack
              flex="1"
              align={{ base: "center", md: "start" }}
              spacing={5}
            >
              <AboutHeader />
              <AboutText />
              <ExploreButton />
            </VStack>
          </Flex>

          {/* Orta Misyon & Vizyon Bölümü */}
          <MissionVision />
        </Stack>
      </Container>
    </Box>
  );
}

export default About;
