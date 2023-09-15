import React from "react";
import { Link, Box, Image, Stack, Text, VStack } from "@chakra-ui/react";
import Tmdb from "./movie.svg";

const Footer = () => {
  return (
    <Stack
      bg="black"
      justifyContent="space-around"
      align="center"
      direction={["column", "row", "row", "row"]}
      color="white"
      p="8"
      borderTop="2px solid red.600">
      <Box textAlign="center">
        <Text fontWeight="bold">Information</Text>
        <Text fontSize="sm">Created by @dxtaner</Text>
        <VStack mt="1" spacing={1}>
          <Link
            href="https://www.themoviedb.org/"
            target="_blank"
            color="blue.300"
            fontSize="sm">
            About TMDB
          </Link>
          <Link
            href="https://developers.themoviedb.org/3/getting-started/introduction"
            target="_blank"
            color="blue.300"
            fontSize="sm">
            About the API
          </Link>
        </VStack>
      </Box>
      <Box>
        <Image src={Tmdb} boxSize="120px" />
      </Box>
      <Box textAlign="center">
        <Text fontWeight="bold">Contact</Text>
        <Text fontSize="sm">tanerozer16@gmail.com</Text>
        <VStack mt="1" spacing={1}>
          <Link
            href="https://www.linkedin.com/in/tanerozer16/"
            target="_blank"
            color="blue.300"
            fontSize="sm">
            Linkedin
          </Link>
          <Link
            href="https://github.com/dxtaner"
            target="_blank"
            color="blue.300"
            fontSize="sm">
            Github
          </Link>
        </VStack>
      </Box>
    </Stack>
  );
};

export default Footer;
