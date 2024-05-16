import React from "react";
import { Box, Text, Image, Badge, Flex } from "@chakra-ui/react";
import nullImage from "../NullImage/null.png";

const PersonCreditCard = ({ credit, showDetails, genreData }) => {
  return (
    <Box
      key={credit.credit_id}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      width="350px"
      margin="20px"
      cursor="pointer"
      onClick={() => showDetails(credit)}
      _hover={{ boxShadow: "lg" }}
      display="grid"
      gridTemplateRows="auto 1fr">
      <Image
        src={
          credit.backdrop_path &&
          credit.backdrop_path !== null &&
          credit.backdrop_path !== "null"
            ? `https://image.tmdb.org/t/p/original${credit.backdrop_path}`
            : nullImage
        }
        alt={credit.title}
        width="100%"
        height="200px"
        borderRadius={"20px 20px 0 0"}
        objectFit="cover"
      />
      <Box p="4">
        <Flex justify="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="bold" color="teal.800">
            {credit.title}
          </Text>
          <Badge colorScheme="teal">{credit.popularity}</Badge>
        </Flex>
        <Text fontSize="md" color="gray.600" mt="2">
          <strong>Karakter:</strong> {credit.character}
        </Text>
        <Text fontSize="md" color="gray.600" mt="2">
          <strong>Orijinal Dil:</strong> {credit.original_language}
        </Text>
        <Text fontSize="md" color="gray.600" mt="2">
          <strong>Yayın Tarihi:</strong> {credit.release_date}
        </Text>
        <Text fontSize="md" color="gray.600" mt="2">
          <strong>Oy Ortalaması:</strong> {credit.vote_average}
        </Text>
        <Text fontSize="md" color="gray.600" mt="2">
          <strong>Oy Sayısı:</strong> {credit.vote_count}
        </Text>
        <Text fontSize="md" color="gray.600" mt="2">
          <strong>Orijinal Başlık:</strong> {credit.original_title}
        </Text>
        <Flex mt="2">
          <Text fontSize="md" fontWeight="bold" color="gray.600" mr="2">
            Türler:
          </Text>
          <Flex flexWrap="wrap">
            {credit.genre_ids.map((id, index) => (
              <Badge key={index} colorScheme="teal" mr="1" mb="1">
                {genreData[id]}
              </Badge>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default PersonCreditCard;
