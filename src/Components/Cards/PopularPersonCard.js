import React from "react";
import { Box, Image, Text, Button, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PopularPersonCard = ({ person }) => {
  const imageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/original${person.profile_path}`
    : null;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="ease-in-out 0.2s"
      _hover={{
        boxShadow: "lg",
        transform: "scale(1.02)",
      }}
      width="100%"
      maxWidth="250px"
      margin="auto"
      marginBottom="4">
      <Box position="relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={person.name}
            borderRadius="lg"
            objectFit="cover"
            width="100%"
            minHeight="200px"
          />
        ) : (
          <Box
            minHeight="300px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="gray.200">
            <Text fontSize="lg" fontWeight="bold" color="gray.600">
              Resim Yok
            </Text>
          </Box>
        )}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          bg="rgba(0, 0, 0, 0.7)"
          color="white"
          p={4}
          textAlign="center"
          transition="background-color 0.3s ease-in-out"
          opacity={0}
          _hover={{
            opacity: 1,
            bg: "rgba(0, 0, 0, 0.8)",
          }}>
          <Text fontSize="lg" fontWeight="bold" mb="2">
            {person.name}
          </Text>
          <Badge colorScheme="yellow" variant="solid" fontSize="sm" mb="2">
            Popüler
          </Badge>
          <Text fontSize="sm" mb="2">
            {person.known_for_department}
          </Text>
          <Button
            as={Link}
            to={`/ActorDetails/${person.id}`}
            colorScheme="yellow"
            variant="outline"
            size="sm"
            width="100%">
            Detayları Görüntüle
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PopularPersonCard;
