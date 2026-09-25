import React from "react";
import { Box, Image, Text, Button, Badge, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PopularPersonCard = ({ person }) => {
  const imageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
    : null;

  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      bg="gray.800"
      border="1px solid"
      borderColor="gray.700"
      boxShadow="lg"
      transition="all 0.3s cubic-bezier(.25,.8,.25,1)"
      _hover={{
        transform: "translateY(-6px)",
        borderColor: "red.600",
        boxShadow: "0 12px 24px -10px rgba(229, 62, 62, 0.3)",
      }}
      width="100%"
      maxWidth="250px"
      margin="auto"
      marginBottom="6"
    >
      <Box position="relative" h="320px" bg="gray.900">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={person.name}
            objectFit="cover"
            width="100%"
            height="100%"
          />
        ) : (
          <Flex
            height="100%"
            alignItems="center"
            justifyContent="center"
            bg="gray.800"
            color="gray.500"
          >
            <Text fontSize="sm" fontWeight="semibold">
              Görsel Yok
            </Text>
          </Flex>
        )}

        {/* Hover overlay katmanı */}
        <Box
          position="absolute"
          inset={0}
          bg="rgba(15, 23, 42, 0.9)"
          color="white"
          p={4}
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          opacity={0}
          transition="all 0.3s ease-in-out"
          backdropFilter="blur(2px)"
          _hover={{
            opacity: 1,
          }}
        >
          <Text fontSize="lg" fontWeight="extrabold" mb={2} color="white">
            {person.name}
          </Text>
          <Badge colorScheme="red" variant="subtle" fontSize="xs" mb={2}>
            Popüler
          </Badge>
          <Text fontSize="xs" color="gray.300" mb={4}>
            {person.known_for_department}
          </Text>
          <Button
            as={Link}
            to={`/ActorDetails/${person.id}`}
            colorScheme="red"
            variant="solid"
            size="sm"
            width="100%"
            borderRadius="lg"
            _hover={{ bg: "red.600" }}
          >
            Detayları Görüntüle
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PopularPersonCard;
