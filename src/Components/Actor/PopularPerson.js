import React, { useEffect } from "react";
import {
  SimpleGrid,
  VStack,
  Text,
  StackDivider,
  Box,
  Center,
  Spinner,
} from "@chakra-ui/react";
import PersonCard from "../Cards/PersonCards.js";
import {
  getPopularPersonsAsync,
  selectPopularPersons,
  selectPopularPersonsStatus,
} from "../../app/features/actors/personPopularSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Title from "../Title/titles.js";

const PopularPersons = () => {
  const dispatch = useDispatch();
  const popularPersons = useSelector(selectPopularPersons);
  const isLoading = useSelector(selectPopularPersonsStatus);

  useEffect(() => {
    dispatch(getPopularPersonsAsync());
  }, [dispatch]);

  return (
    <VStack
      divider={<StackDivider borderColor="blue.800" />}
      spacing={4}
      p={[2, 4, 6, 8]}
      alignItems="stretch" // Bileşenleri yatay olarak çekmek için
    >
      <Box>
        <Title text="Popüler Kişiler">
          <Text fontSize="lg" fontWeight="bold">
            Popüler Oyuncular ve Kişilerin Listesi
          </Text>
        </Title>
      </Box>
      {isLoading === "loading" ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={4}>
          {popularPersons.map((item) => (
            <PersonCard key={item.id} person={item} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default PopularPersons;
