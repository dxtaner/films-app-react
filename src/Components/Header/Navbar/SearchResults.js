import React from "react";
import { List, ListItem, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SearchResults = ({ results, handleResultClick }) => {
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
            <Link to={`/movieDetails/${result.id}`}>
              <Text>{result.title}</Text>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchResults;
