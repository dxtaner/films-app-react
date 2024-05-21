import React from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Divider,
} from "@chakra-ui/react";
import { FaFlag } from "react-icons/fa";

const OriginCountryFilter = ({ queryParams, onFilterChange }) => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      borderColor="gray.200"
      _hover={{ boxShadow: "lg", borderColor: "gray.300" }}>
      <Text fontSize="md" fontWeight="bold" mb={2} color="teal.600">
        Orijinal Film Ülkesi
      </Text>
      <Divider my={2} borderColor="teal.500" />
      <InputGroup size="md" alignItems="center">
        <InputLeftElement pointerEvents="none" color="gray.400">
          <FaFlag />
        </InputLeftElement>
        <Input
          type="text"
          value={queryParams.with_origin_country || ""}
          onChange={(e) =>
            onFilterChange("with_origin_country", e.target.value)
          }
          placeholder="Ülke"
          size="md"
          borderRadius="md"
          borderColor="gray.300"
          _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }}
        />
      </InputGroup>
    </Box>
  );
};

export default OriginCountryFilter;
