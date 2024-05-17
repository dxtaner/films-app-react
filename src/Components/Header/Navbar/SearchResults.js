import React from "react";
import { List, ListItem, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SearchResults = ({ results, handleResultClick }) => {
  const navigate = useNavigate();

  const showDetails = (result) => {
    navigate(`/MovieDetails/${result.id}`, { state: result });
  };

  return (
    <Box
      bg="white"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      maxH="200px"
      overflowY="auto">
      <List spacing={2}>
        {results.map((result) => (
          <ListItem
            key={result.id}
            py={2}
            px={4}
            cursor="pointer"
            _hover={{ bg: "gray.100" }}
            onClick={() => handleResultClick(result)}>
            <Text onClick={() => showDetails(result)}>{result.title}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchResults;
