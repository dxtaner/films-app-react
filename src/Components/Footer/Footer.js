import {
  Link,
  Box,
  Image,
  Stack,
  Text,
  VStack,
  Icon,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
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
      borderTop="3px solid red.600"
      spacing={4}>
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

        <VStack mt="3" spacing={3} className="link-container">
          <Tooltip label="Email">
            <IconButton
              as="a"
              href="mailto:tanerozer16@gmail.com"
              target="_blank"
              aria-label="Email"
              icon={<Icon as={FaEnvelope} w={8} h={8} color="blue.400" />}
              colorScheme="blue"
              size="lg"
            />
          </Tooltip>
          <Tooltip label="LinkedIn">
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/tanerozer16/"
              target="_blank"
              aria-label="LinkedIn"
              icon={<Icon as={FaLinkedin} w={8} h={8} color="blue.400" />}
              colorScheme="blue"
              size="lg"
            />
          </Tooltip>
          <Tooltip label="GitHub">
            <IconButton
              as="a"
              href="https://github.com/dxtaner"
              target="_blank"
              aria-label="GitHub"
              icon={<Icon as={FaGithub} w={8} h={8} color="blue.400" />}
              colorScheme="blue"
              size="lg"
            />
          </Tooltip>
          <Tooltip label="Medium">
            <IconButton
              as="a"
              href="https://medium.com/@dxtaner"
              target="_blank"
              aria-label="Medium"
              icon={<Icon as={FaMedium} w={8} h={8} color="blue.400" />}
              colorScheme="blue"
              size="lg"
            />
          </Tooltip>
        </VStack>
      </Box>
    </Stack>
  );
};

export default Footer;
