import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPersonTvCredits } from "../../app/features/actors/personTvCreditsSlice";
import {
  Box,
  Center,
  Spinner,
  Text,
  Grid,
  Button,
  VStack,
  HStack,
  ButtonGroup,
} from "@chakra-ui/react";
import CastCard from "./CastCard";
import CrewCard from "./CrewCard";
import Title from "../Title/titles";

const PersonTvCredits = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tvCredits, status, error } = useSelector(
    (state) => state.personTvCredits,
  );
  const [showCast, setShowCast] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getPersonTvCredits(id));
      setCurrentPage(1);
    }
  }, [dispatch, id]);

  const handleShowCastChange = (value) => {
    setShowCast(value);
    setCurrentPage(1);
  };

  const itemsPerPage = 10;
  const currentList = showCast ? tvCredits?.cast || [] : tvCredits?.crew || [];
  const totalPages = Math.ceil(currentList.length / itemsPerPage);
  const currentItems = currentList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Box
      p={6}
      borderRadius="xl"
      bg="gray.800"
      border="1px solid"
      borderColor="gray.700"
    >
      <VStack spacing={6} align="stretch">
        <Title text="Dizi Yapımları" />

        <HStack justify="center">
          <ButtonGroup isAttached variant="outline">
            <Button
              bg={showCast ? "red.600" : "transparent"}
              color="white"
              borderColor="gray.600"
              _hover={{ bg: showCast ? "red.700" : "gray.700" }}
              onClick={() => handleShowCastChange(true)}
            >
              Oyuncu ({tvCredits?.cast?.length || 0})
            </Button>
            <Button
              bg={!showCast ? "red.600" : "transparent"}
              color="white"
              borderColor="gray.600"
              _hover={{ bg: !showCast ? "red.700" : "gray.700" }}
              onClick={() => handleShowCastChange(false)}
            >
              Ekip ({tvCredits?.crew?.length || 0})
            </Button>
          </ButtonGroup>
        </HStack>

        {status === "loading" && (
          <Center py={8}>
            <Spinner size="xl" color="red.500" />
          </Center>
        )}

        {status === "failed" && (
          <Center py={6}>
            <Text fontSize="md" color="red.400">
              Hata: {error}
            </Text>
          </Center>
        )}

        {status === "succeeded" && (
          <>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(5, 1fr)",
              }}
              gap={4}
            >
              {currentItems.map((credit) =>
                showCast ? (
                  <CastCard
                    key={credit.credit_id || credit.id}
                    credit={credit}
                  />
                ) : (
                  <CrewCard
                    key={credit.credit_id || credit.id}
                    credit={credit}
                  />
                ),
              )}
            </Grid>

            {totalPages > 1 && (
              <HStack mt={4} spacing={3} justify="center">
                <Button
                  size="sm"
                  bg="gray.900"
                  color="white"
                  borderColor="gray.700"
                  border="1px solid"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  isDisabled={currentPage === 1}
                  _hover={{ bg: "red.600" }}
                >
                  Önceki
                </Button>
                <Text fontSize="sm" color="gray.300">
                  {currentPage} / {totalPages}
                </Text>
                <Button
                  size="sm"
                  bg="gray.900"
                  color="white"
                  borderColor="gray.700"
                  border="1px solid"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  isDisabled={currentPage === totalPages}
                  _hover={{ bg: "red.600" }}
                >
                  Sonraki
                </Button>
              </HStack>
            )}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default PersonTvCredits;
