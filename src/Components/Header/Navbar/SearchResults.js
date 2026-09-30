import React from "react";
import { List, ListItem, Box, Text, Flex, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";

const SearchResults = ({ results, handleResultClick }) => {
  const navigate = useNavigate();
  const safeResults = Array.isArray(results) ? results : [];

  const showDetails = (result) => {
    handleResultClick();
    navigate(`/MovieDetails/${result.id}`, { state: result });
  };

  return (
    <Box
      bg="gray.800"
      boxShadow="2xl"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="xl"
      maxH="350px"
      overflowY="auto"
      width="100%"
      p={2}
    >
      <List spacing={1}>
        {safeResults.length > 0 ? (
          safeResults.map((result) => (
            <ListItem
              key={result.id}
              py={3}
              px={4}
              cursor="pointer"
              borderRadius="lg"
              color="white"
              _hover={{
                bg: "gray.700",
                color: "red.400",
              }}
              transition="all 0.2s"
              onClick={() => showDetails(result)}
            >
              <Flex align="center" justify="space-between">
                <Text fontSize="md" fontWeight="medium" isTruncated mr={2}>
                  {result.title || result.name}
                </Text>
                <Icon as={ChevronRightIcon} boxSize={5} color="gray.400" />
              </Flex>
            </ListItem>
          ))
        ) : (
          <Box py={4} textAlign="center" color="gray.400">
            <Text fontSize="sm">Aramanızla eşleşen sonuç bulunamadı.</Text>
          </Box>
        )}
      </List>
    </Box>
  );
};

export default SearchResults;
