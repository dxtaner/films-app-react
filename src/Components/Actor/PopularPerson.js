import React, { useState, useEffect } from "react";
import {
  SimpleGrid,
  VStack,
  Text,
  StackDivider,
  Box,
  Center,
  Spinner,
  Input,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PersonCard from "../Cards/PersonCards";
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
      spacing={4}
      p={[2, 4, 6, 8]}
      alignItems="stretch">
      <Box>
        <Title text="Popüler Kişiler">
          <Text fontSize="lg" fontWeight="bold">
            Popüler oyuncular ve kişilerin listesi
          </Text>
        </Title>
      </Box>

      <Box justifyContent={"center"} display="flex">
        <Link to="/SearchPerson">
          <Button colorScheme="yellow">Oyuncu Arama Sayfasına Git</Button>
        </Link>
      </Box>

      <Box>
        <Input
          type="text"
          placeholder="Kişi ara..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>

      {isLoading === "loading" ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : filteredPersons.length === 0 ? (
        <Box textAlign="center" width="100%">
          <Text fontSize="lg" fontWeight="bold" color="red.500">
            Aradığınız kişi bulunamadı.
          </Text>
        </Box>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={4}>
          {filteredPersons.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default PopularPersons;
