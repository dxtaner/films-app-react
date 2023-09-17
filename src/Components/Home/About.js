import React from "react";
import {
  Box,
  Center,
  Divider,
  Icon,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react";
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
          p={4}
          textAlign="center"
          bgColor="white"
          rounded="lg"
          shadow="lg"
          maxW="800px">
          <Icon as={FaFilm} boxSize={12} color="blue.900" mb={4} />
          <MovieImage />
          <AboutHeader />
          <AboutText />
          <ExploreButton />
          <Divider my={4} />
          <VStack spacing={4} align="start">
            <MissionVision />
          </VStack>
          <Text fontSize="sm" mt={4} color="gray.700">
            © 2023 Film Dünyası
          </Text>
        </Box>
      </Center>
    </Box>
  );
}

export default About;
