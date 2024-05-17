import React from "react";
import { Box, Text, Image, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import nullImage from "../../NullImage/nullImage.jpg";

const PersonCard = ({ person }) => {
  const imageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
    : nullImage;

  return (
    <Link to={`/ActorDetails/${person.id}`}>
      <Box
        p={4}
        m={4}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        bg={"gray.100"}
        transition="all 0.3s"
        _hover={{ transform: "scale(1.05)", shadow: "xl" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        textDecoration="none"
        cursor="pointer">
        <Image
          src={imageUrl}
          alt={person.name}
          borderRadius="full"
          boxSize="150px"
          objectFit="cover"
          mb={4}
        />
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          {person.name}
        </Text>
        <Box mb={2}>
          <Badge
            colorScheme={person.gender === 1 ? "pink" : "blue"}
            borderRadius="full"
            px={2}
            py={1}>
            {person.gender === 1 ? "Kadın" : "Erkek"}
          </Badge>
        </Box>
        <Text fontSize="sm" mb={2}>
          Popülerlik: {person.popularity}
        </Text>
        <Text fontSize="sm" mb={2}>
          Bilinen:{" "}
          {person.known_for?.[0]?.original_title ||
            person.known_for?.[0]?.original_name}
        </Text>
      </Box>
    </Link>
  );
};

export default PersonCard;
