import React from "react";
import { List, ListItem, Box, Text, Flex, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";

const SearchResults = ({ results, handleResultClick }) => {
  const navigate = useNavigate();

  const showDetails = (result) => {
    navigate(`/MovieDetails/${result.id}`, { state: result });
  };

  const safeResults = Array.isArray(results) ? results : [];

  return (
    <Box
      bg="white"
      boxShadow="xl"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      maxH="400px"
      overflowY="auto"
      width="100%"
      p={4}
      mt={4}>
      <List spacing={3}>
        {safeResults.map((result) => (
          <ListItem
            key={result.id}
            py={3}
            px={4}
            cursor="pointer"
            borderRadius="md"
            _hover={{
              bg: "gray.50",
              transform: "scale(1.02)",
              boxShadow: "md",
            }}
            transition="all 0.2s"
            onClick={() => {
              handleResultClick(result);
              showDetails(result);
            }}>
            <Flex align="center" justify="space-between">
              <Text fontSize="lg" fontWeight="bold">
                {result.title}
              </Text>
              <Icon as={ChevronRightIcon} boxSize={6} />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchResults;
