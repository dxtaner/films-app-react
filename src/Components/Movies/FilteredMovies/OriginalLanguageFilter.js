import React from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Divider,
} from "@chakra-ui/react";
import { FaLanguage } from "react-icons/fa";

const OriginalLanguageFilter = ({ queryParams, onFilterChange }) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="xl"
      bg="gray.900"
      borderColor="gray.800"
      boxShadow="lg"
      _hover={{ borderColor: "gray.700" }}
    >
      <Text fontSize="sm" fontWeight="bold" mb={1} color="gray.200">
        Orijinal Film Dili
      </Text>
      <Divider my={2} borderColor="gray.800" />
      <InputGroup size="sm">
        <InputLeftElement pointerEvents="none" color="gray.500">
          <FaLanguage />
        </InputLeftElement>
        <Input
          type="text"
          value={queryParams.with_original_language || ""}
          onChange={(e) =>
            onFilterChange("with_original_language", e.target.value)
          }
          placeholder="Örn: tr, en, ja"
          borderRadius="lg"
          borderColor="gray.700"
          bg="gray.800"
          color="white"
          _placeholder={{ color: "gray.500" }}
          _focus={{ borderColor: "red.500", boxShadow: "0 0 0 1px #E53E3E" }}
          _hover={{ borderColor: "gray.600" }}
        />
      </InputGroup>
    </Box>
  );
};

export default OriginalLanguageFilter;
