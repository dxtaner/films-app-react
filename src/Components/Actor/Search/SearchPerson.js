import React, { useState } from "react";
import {
  Text,
  Input,
  SimpleGrid,
  Spinner,
  Stack,
  Flex,
  Center,
  Box,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchPersonsAsync,
  selectSearchResults,
  selectSearchStatus,
} from "../../../app/features/actors/personSearchSlice.js";
import SearchPersonCard from "./SearchPersonCard.js";
import Title from "../../Title/titles.js";

const SearchPerson = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);
  const searchStatus = useSelector(selectSearchStatus);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      dispatch(searchPersonsAsync(value));
    }
  };

  return (
    <Stack
      spacing={6}
      mx="auto"
      bg="gray.900"
      p={{ base: 4, md: 8 }}
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.800"
      boxShadow="2xl"
    >
      <Box textAlign="center">
        <Title text="Oyuncu Arama" />
        <Text fontSize="md" color="gray.400" mt={2}>
          Sinema ve dizi dünyasından oyuncu veya ekip üyesi arayın
        </Text>
      </Box>

      <Flex justify="center" maxW="600px" mx="auto" w="100%">
        <Input
          type="text"
          placeholder="Kişi adı girin (Örn: Keanu Reeves)..."
          value={searchTerm}
          onChange={handleSearchChange}
          borderRadius="xl"
          bg="gray.800"
          borderColor="gray.700"
          color="white"
          size="lg"
          _placeholder={{ color: "gray.500" }}
          _focus={{ borderColor: "red.500", boxShadow: "0 0 0 1px #E53E3E" }}
        />
      </Flex>

      {searchStatus === "loading" ? (
        <Center py={12}>
          <Spinner size="xl" color="red.500" thickness="4px" />
        </Center>
      ) : searchTerm.trim() && searchResults.length === 0 ? (
        <Center py={8}>
          <Box
            bg="gray.800"
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor="red.900"
          >
            <Text
              fontSize="md"
              color="red.400"
              textAlign="center"
              fontWeight="semibold"
            >
              "{searchTerm}" ile eşleşen bir oyuncu bulunamadı.
            </Text>
          </Box>
        </Center>
      ) : searchResults.length > 0 ? (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={6}
          pt={4}
        >
          {searchResults.map((person) => (
            <SearchPersonCard key={person.id} person={person} />
          ))}
        </SimpleGrid>
      ) : (
        <VStack py={12} color="gray.500" spacing={2}>
          <Text fontSize="md">
            Sonuçları görmek için yukarıdaki alana bir oyuncu adı yazın.
          </Text>
        </VStack>
      )}
    </Stack>
  );
};

export default SearchPerson;
