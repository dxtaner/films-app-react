import React from "react";
import { Box, Center, Divider, Icon, Text, VStack } from "@chakra-ui/react";
import { FaFilm } from "react-icons/fa";
import MovieImage from "./MovieImage";
import AboutHeader from "./AboutHeader";
import AboutText from "./AboutText";
import ExploreButton from "./ExploreButton";
import MissionVision from "./MissionVision";

function About() {
  return (
    <Box bgGradient="linear(to-r, teal.800, blue.100)" minH="100vh">
      <Center py={8}>
        <Box
          p={8}
          textAlign="center"
          bgColor="white"
          rounded="lg"
          shadow="xl"
          maxW="800px">
          <Icon as={FaFilm} boxSize={16} color="blue.900" mb={4} />
          <MovieImage />
          <AboutHeader />
          <AboutText />
          <ExploreButton />
          <Divider my={6} borderColor="gray.400" />
          <VStack spacing={6} align="start">
            <MissionVision />
          </VStack>
          <Text fontSize="sm" mt={6} color="gray.700">
            © 2024 Film Dünyası
          </Text>
        </Box>
      </Center>
    </Box>
  );
}

export default About;
