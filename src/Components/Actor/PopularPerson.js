import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Input,
  SimpleGrid,
  Spinner,
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

  const filteredPersons = popularPersons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <VStack
      spacing={6}
      p={6}
      alignItems="stretch"
      bg="gray.900"
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.800"
      boxShadow="2xl"
    >
      <Box textAlign="center">
        <Title text="Popüler Kişiler" />
        <Text fontSize="md" color="gray.400" mt={2}>
          Sinema ve dizi dünyasının en popüler isimleri
        </Text>
      </Box>

      <Center>
        <Link to="/SearchPerson">
          <Button colorScheme="red" size="md" borderRadius="xl">
            Oyuncu Arama Sayfasına Git
          </Button>
        </Link>
      </Center>

      <Input
        type="text"
        placeholder="Kişi adı ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        borderRadius="xl"
        bg="gray.800"
        borderColor="gray.700"
        color="white"
        _placeholder={{ color: "gray.500" }}
        _focus={{ borderColor: "red.500" }}
        size="lg"
      />

      {isLoading === "loading" ? (
        <Center py={12}>
          <Spinner size="xl" color="red.500" />
        </Center>
      ) : filteredPersons.length === 0 ? (
        <Text textAlign="center" fontSize="md" color="red.400" py={8}>
          Aradığınız kriterlere uygun kişi bulunamadı.
        </Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={4}
        >
          {filteredPersons.map((person) => (
            <PopularPersonCard key={person.id} person={person} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default PopularPersons;
