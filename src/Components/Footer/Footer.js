import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Link,
  IconButton,
  Tooltip,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import Tmdb from "./movie.svg";
import { FaLinkedin, FaGithub, FaMedium, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      bg="gray.900"
      color="gray.300"
      borderTop="3px solid"
      borderColor="red.600"
      mt="auto"
    >
      <Container maxW="container.xl" py={10}>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={8}
          alignItems="center"
          justifyItems={{ base: "center", md: "center" }}
        >
          {/* Sol Sütun: Bilgi & Linkler */}
          <VStack align={{ base: "center", md: "start" }} spacing={3}>
            <Text
              fontWeight="bold"
              fontSize="lg"
              color="white"
              letterSpacing="wide"
            >
              Bilgilendirme
            </Text>
            <Link
              href="https://www.themoviedb.org/"
              isExternal
              fontSize="sm"
              _hover={{ color: "red.400", textDecoration: "underline" }}
              transition="color 0.2s"
            >
              TMDB Hakkında
            </Link>
            <Link
              href="https://developers.themoviedb.org/3/getting-started/introduction"
              isExternal
              fontSize="sm"
              _hover={{ color: "red.400", textDecoration: "underline" }}
              transition="color 0.2s"
            >
              API Dokümantasyonu
            </Link>
          </VStack>

          {/* Orta Sütun: TMDB Logosu */}
          <VStack spacing={2} align="center">
            <Image
              src={Tmdb}
              alt="TMDB Logo"
              maxW="140px"
              objectFit="contain"
              opacity={0.9}
              _hover={{ opacity: 1 }}
              transition="opacity 0.2s"
            />
            <Text fontSize="xs" color="gray.500" textAlign="center">
              Bu ürün, TMDB API'sini kullanır ancak TMDB tarafından onaylanmamış
              veya sertifikalandırılmamıştır.
            </Text>
          </VStack>

          {/* Sağ Sütun: İletişim & Sosyal Medya */}
          <VStack align={{ base: "center", md: "end" }} spacing={3}>
            <Text
              fontWeight="bold"
              fontSize="lg"
              color="white"
              letterSpacing="wide"
            >
              İletişim
            </Text>

            <HStack spacing={2}>
              <Tooltip label="E-posta Gönder" hasArrow placement="top">
                <IconButton
                  as="a"
                  href="mailto:tanerozer16@gmail.com"
                  aria-label="Email"
                  icon={<FaEnvelope />}
                  variant="ghost"
                  colorScheme="red"
                  color="gray.300"
                  _hover={{ color: "red.400", bg: "gray.800" }}
                  size="lg"
                  isRound
                />
              </Tooltip>

              <Tooltip label="LinkedIn" hasArrow placement="top">
                <IconButton
                  as="a"
                  href="https://www.linkedin.com/in/tanerozer16/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  icon={<FaLinkedin />}
                  variant="ghost"
                  colorScheme="red"
                  color="gray.300"
                  _hover={{ color: "red.400", bg: "gray.800" }}
                  size="lg"
                  isRound
                />
              </Tooltip>

              <Tooltip label="GitHub" hasArrow placement="top">
                <IconButton
                  as="a"
                  href="https://github.com/dxtaner"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  icon={<FaGithub />}
                  variant="ghost"
                  colorScheme="red"
                  color="gray.300"
                  _hover={{ color: "red.400", bg: "gray.800" }}
                  size="lg"
                  isRound
                />
              </Tooltip>

              <Tooltip label="Medium" hasArrow placement="top">
                <IconButton
                  as="a"
                  href="https://medium.com/@dxtaner"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Medium"
                  icon={<FaMedium />}
                  variant="ghost"
                  colorScheme="red"
                  color="gray.300"
                  _hover={{ color: "red.400", bg: "gray.800" }}
                  size="lg"
                  isRound
                />
              </Tooltip>
            </HStack>
          </VStack>
        </SimpleGrid>

        <Divider my={6} borderColor="gray.800" />

        {/* Alt Telif / İmza Alanı */}
        <Stack
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align="center"
          fontSize="xs"
          color="gray.500"
        >
          <Text>© {currentYear} TMDB Filmleri. Tüm hakkı saklıdır.</Text>
          <Text>
            Created with ❤️ by{" "}
            <Link
              href="https://github.com/dxtaner"
              isExternal
              color="gray.400"
              fontWeight="semibold"
              _hover={{ color: "red.400" }}
            >
              @dxtaner
            </Link>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
