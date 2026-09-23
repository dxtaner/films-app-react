import React from "react";
import {
  Heading,
  Text,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Icon,
} from "@chakra-ui/react";
import { MdOutlineLightbulb, MdStarBorder } from "react-icons/md";

function MissionVision() {
  return (
    <Stack direction={{ base: "column", md: "row" }} spacing={6}>
      <Card
        flex="1"
        bg="gray.900"
        color="gray.100"
        p={4}
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.800"
        boxShadow="md"
        _hover={{ borderColor: "red.600", transform: "translateY(-4px)" }}
        transition="all 0.3s ease"
      >
        <CardHeader display="flex" alignItems="center" gap={3} pb={2}>
          <Icon as={MdStarBorder} boxSize={7} color="red.500" />
          <Heading as="h3" size="md" fontWeight="bold">
            Misyonumuz
          </Heading>
        </CardHeader>
        <CardBody pt={0}>
          <Text color="gray.400" fontSize="sm" lineHeight="relaxed">
            Sizlere en kaliteli film deneyimini sunmak, tarafsız incelemeler
            sağlamak ve sinema dünyasındaki en son güncel içeriklerle
            buluşturmak.
          </Text>
        </CardBody>
      </Card>

      <Card
        flex="1"
        bg="gray.900"
        color="gray.100"
        p={4}
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.800"
        boxShadow="md"
        _hover={{ borderColor: "red.600", transform: "translateY(-4px)" }}
        transition="all 0.3s ease"
      >
        <CardHeader display="flex" alignItems="center" gap={3} pb={2}>
          <Icon as={MdOutlineLightbulb} boxSize={7} color="red.500" />
          <Heading as="h3" size="md" fontWeight="bold">
            Vizyonumuz
          </Heading>
        </CardHeader>
        <CardBody pt={0}>
          <Text color="gray.400" fontSize="sm" lineHeight="relaxed">
            Sinema tutkunları için kapsayıcı, erişilebilir ve modern bir film
            rehberi olarak sektörün öncü dijital platformlarından biri haline
            gelmek.
          </Text>
        </CardBody>
      </Card>
    </Stack>
  );
}

export default MissionVision;
