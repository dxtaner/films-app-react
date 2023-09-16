import {
  Box,
  Center,
  Heading,
  Text,
  Button,
  Stack,
  Divider,
  Icon,
  Image,
} from "@chakra-ui/react";
import { FaFilm } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom"; // React Router'dan useNavigate ekleniyor
import movieImage from "./movieImage.jpg"; // Kendi film görselinizi ekleyin

function About() {
  const navigate = useNavigate(); // useNavigate hook'unu kullanarak yönlendirme işlevini alın

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
          <Image src={movieImage} alt="Film" mb={4} rounded="md" w="100%" />
          <Heading as="h2" size="xl" mb={4}>
            Site Hakkında
          </Heading>
          <Text fontSize="lg" mb={4}>
            Bu sayfa, sitemizde yer alan filmler hakkında bilgileri
            içermektedir. Sitemizde en yeni ve en popüler filmleri bulabilir,
            inceleyebilir ve hakkında daha fazla bilgi alabilirsiniz. Ayrıca,
            filmlerin türleri ve daha fazlası hakkında detayları bu sayfada
            bulabilirsiniz. Film dünyasının en güncel gelişmelerini takip etmek
            için bu sayfayı ziyaret edebilirsiniz.
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            mb={4}
            onClick={() => navigate("/")} // Ana sayfaya yönlendirme işlemi ekleniyor
          >
            Daha Fazla Keşfet
          </Button>
          <Divider my={4} />
          <Stack direction="row" spacing={4}>
            <Box>
              <Heading as="h3" size="lg">
                Misyonumuz
              </Heading>
              <Text>
                Sizlere en iyi film deneyimini sunmak ve en son film haberleri
                ile güncel kalmak.
              </Text>
            </Box>
            <Box>
              <Heading as="h3" size="lg">
                Vizyonumuz
              </Heading>
              <Text>
                Sinema dünyasının geleceğini şekillendirmek ve en iyi film
                içeriğini sağlamak.
              </Text>
            </Box>
          </Stack>
        </Box>
      </Center>
    </Box>
  );
}

export default About;
