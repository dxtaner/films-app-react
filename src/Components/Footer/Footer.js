import { Link, Box, Image, Stack, Text, VStack, Icon } from "@chakra-ui/react";
import Tmdb from "./movie.svg";
import { FaLinkedin, FaGithub, FaMedium, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <Stack
      bg="gray.800"
      justifyContent="space-around"
      align="center"
      direction={["column", "row", "row", "row"]}
      color="white"
      p="4"
      borderTop="3px solid red.600">
      <Box textAlign="center">
        <Text fontWeight="bold" fontSize="xl" color="blue.300">
          Information
        </Text>
        <Text fontSize="md">2023 © Created by @dxtaner</Text>
        <VStack mt="3" spacing={3}>
          <Link
            href="https://www.themoviedb.org/"
            target="_blank"
            color="blue.400"
            fontSize="md">
            About TMDB
          </Link>
          <Link
            href="https://developers.themoviedb.org/3/getting-started/introduction"
            target="_blank"
            color="blue.400"
            fontSize="md">
            About the API
          </Link>
        </VStack>
      </Box>
      <Box>
        <Image src={Tmdb} boxSize="180px" />
      </Box>
      <Box textAlign="center">
        <Text fontWeight="bold" fontSize="xl" color="blue.300">
          Contact
        </Text>

        <Text fontSize="md">
          <a href="mailto:tanerozer16@gmail.com" className="custom-link">
            <Icon as={FaEnvelope} w={8} h={8} color="blue.400" />
          </a>
        </Text>
        <VStack mt="3" spacing={3} className="link-container">
          <Link
            href="https://www.linkedin.com/in/tanerozer16/"
            target="_blank"
            className="custom-link">
            <Icon as={FaLinkedin} w={8} h={8} color="blue.400" />
          </Link>
          <Link
            href="https://github.com/dxtaner"
            target="_blank"
            className="custom-link">
            <Icon as={FaGithub} w={8} h={8} color="blue.400" />
          </Link>
          <Link
            href="https://medium.com/@dxtaner"
            target="_blank"
            className="custom-link">
            <Icon as={FaMedium} w={8} h={8} color="blue.400" />
          </Link>
        </VStack>
      </Box>
    </Stack>
  );
};

export default Footer;
