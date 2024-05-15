import React from "react";
import { Box, Image, Text, Flex, Button, Badge, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdStar } from "react-icons/md";

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
    <MotionBox
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        shadow="md"
        p={4}
        m={2}
        cursor="pointer"
        transition="transform 0.2s ease-in-out"
        _hover={{ transform: "scale(1.05)" }}>
        <Image
          src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
          alt={person.name}
          borderRadius="md"
          boxShadow="md"
          objectFit="cover"
          width="100%"
          maxHeight="300px"
          onClick={showDetails}
        />
        <Flex
          mt={4}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap">
          <Text fontWeight="bold" fontSize="lg" flex="1">
            {person.name}
          </Text>
          <Flex alignItems="center">
            <Badge
              variant="solid"
              colorScheme="teal"
              mr={2}
              mb={[2, 0]}
              fontSize="sm">
              Popüler
            </Badge>
            <Flex alignItems="center">
              <Icon as={MdStar} color="teal.500" mr={1} />
              <Text>{person.popularity.toFixed(1)}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Text mt={2} fontSize="sm" color="gray.600">
          {person.known_for_department}
        </Text>
        <Button
          colorScheme="teal"
          size="sm"
          mt={4}
          onClick={showDetails}
          width="100%">
          Detayları Görüntüle
        </Button>
      </Box>
    </MotionBox>
  );
};

export default PersonCard;
