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
  StackDivider,
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
    dispatch(searchPersonsAsync(value));
  };

  return (
    <Stack
      spacing={6}
      mx="auto"
      bg={"gray.50"}
      p={6}
      divider={<StackDivider borderColor="blue.800" />}
      borderWidth="1px"
      borderRadius="md">
      <Box textAlign="center">
        <Title text="Oyuncu Arama" textAlign="center" />
        <Text fontSize="lg" color="gray.600">
          Aranan oyuncular ve kişilerin listesi
        </Text>
      </Box>
      <Flex justify="center">
        <Input
          type="text"
          placeholder="Kişi adı girin..."
          value={searchTerm}
          onChange={handleSearchChange}
          borderRadius="md"
          borderColor="gray.300"
          boxShadow="md"
          _focus={{ borderColor: "blue.500" }}
          size="lg"
        />
      </Flex>

      {searchStatus === "loading" ? (
        <Center>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : searchResults.length === 0 ? (
        <Center>
          <Box bg="gray.100" p={4} borderRadius="md" boxShadow="md">
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="red.500"
              textAlign="center">
              Aradığınız kişi bulunamadı.
            </Text>
          </Box>
        </Center>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={4}>
          {searchResults.map((person) => (
            <SearchPersonCard key={person.id} person={person} />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
};

export default SearchPerson;
