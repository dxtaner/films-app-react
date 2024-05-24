import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Input,
  SimpleGrid,
  Spinner,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PopularPersonCard from "../Cards/PopularPersonCard";
import {
  getPopularPersonsAsync,
  selectPopularPersons,
  selectPopularPersonsStatus,
} from "../../app/features/actors/personPopularSlice";
import { useDispatch, useSelector } from "react-redux";
import Title from "../Title/titles";

const PopularPersons = () => {
  const dispatch = useDispatch();
  const popularPersons = useSelector(selectPopularPersons);
  const isLoading = useSelector(selectPopularPersonsStatus);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getPopularPersonsAsync());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersons = popularPersons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <VStack
      divider={<StackDivider borderColor="blue.800" />}
      spacing={6}
      p={6}
      alignItems="stretch"
      backgroundColor="gray.50"
      borderRadius="xl"
      boxShadow="lg">
      <Box textAlign="center">
        <Title text="Popüler Kişiler" />
        <Text fontSize="lg" color="gray.600">
          Popüler oyuncular ve kişilerin listesi
        </Text>
      </Box>

      <Box textAlign="center">
        <Link to="/SearchPerson">
          <Button colorScheme="yellow">Oyuncu Arama Sayfasına Git</Button>
        </Link>
      </Box>

      <Input
        type="text"
        placeholder="Kişi ara..."
        value={searchTerm}
        onChange={handleSearchChange}
        borderRadius="xl"
        borderColor="gray.300"
        boxShadow="md"
        _focus={{ borderColor: "blue.500" }}
        size="lg"
      />

      {isLoading === "loading" ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : filteredPersons.length === 0 ? (
        <Text fontSize="lg" fontWeight="bold" color="red.500">
          Aradığınız kişi bulunamadı.
        </Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={4}>
          {filteredPersons.map((person) => (
            <PopularPersonCard key={person.id} person={person} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default PopularPersons;
