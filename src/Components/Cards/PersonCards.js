import React from "react";
import { Box, Image, Text, Flex, Button, Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PersonCard = ({ person }) => {
  const MotionBox = motion.div;
  const navigate = useNavigate();

  const showDetails = () => {
    if (person.id) {
      navigate(`/actorDetails/${person.id}`, { state: person });
    } else {
      console.error("Person ID is undefined or null.");
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      p={4}
      m={2}
      onClick={showDetails}
      cursor="pointer"
      transition="transform 0.2s ease-in-out"
      _hover={{
        transform: "scale(1.03)",
      }}>
      <MotionBox whileHover={{ scale: 1.03 }}>
        <Image
          src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
          alt={person.name}
          borderRadius="md"
          boxShadow="md"
          objectFit="cover"
          width="100%"
          maxHeight="300px"
        />
      </MotionBox>
      <Flex mt={2} justifyContent="space-between" alignItems="center">
        <Text fontWeight="semibold" fontSize="lg">
          {person.name}
        </Text>
        <Badge variant="outline" colorScheme="teal">
          Popüler
        </Badge>
      </Flex>
      <Text mt={2} fontSize="sm">
        {person.known_for_department}
      </Text>
      <Button
        colorScheme="gray"
        size="sm"
        mt={2}
        onClick={showDetails}
        width="100%">
        Detayları Görüntüle
      </Button>
    </Box>
  );
};

export default PersonCard;
