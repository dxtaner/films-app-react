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
} from "@chakra-ui/react";
import CastCard from "./CastCard";
import CrewCard from "./CrewCard";
import Title from "../Title/titles";

const PersonTvCredits = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tvCredits, status, error } = useSelector(
    (state) => state.personTvCredits
  );
  const [showCast, setShowCast] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getPersonTvCredits(id));
    setCurrentPage(1);
  }, [dispatch, id, showCast]);

  const handleShowCastChange = (value) => {
    setShowCast(value);
    setCurrentPage(1);
  };

  const renderLoading = () => (
    <Center h="100vh">
      <Spinner size="xl" />
    </Center>
  );

  const renderError = () => (
    <Center h="100vh">
      <Text fontSize="xl" color="red.500">
        Hata: {error}
      </Text>
    </Center>
  );

  const renderTvCredits = () => {
    const itemsPerPage = 20;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = showCast
      ? tvCredits.cast?.slice(indexOfFirstItem, indexOfLastItem)
      : tvCredits.crew?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(
      (showCast ? tvCredits.cast?.length : tvCredits.crew?.length) /
        itemsPerPage
    );

    return (
      <Box p="4">
        <VStack spacing="6" align="center">
          <Title text="Tv Serilerindeki Yapımları" />
          <HStack>
            {tvCredits.cast && (
              <Button
                colorScheme={showCast ? "blue" : "gray"}
                onClick={() => handleShowCastChange(true)}
                mr="2">
                Oyuncu
              </Button>
            )}
            {tvCredits.crew && (
              <Button
                colorScheme={!showCast ? "blue" : "gray"}
                onClick={() => handleShowCastChange(false)}>
                Ekip
              </Button>
            )}
          </HStack>
        </VStack>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap="6"
          mt="4">
          {currentItems &&
            currentItems.map((credit) => {
              if (showCast) {
                return (
                  <CastCard
                    key={credit.credit_id || credit.id}
                    credit={credit}
                  />
                );
              } else {
                return (
                  <CrewCard
                    key={credit.credit_id || credit.id}
                    credit={credit}
                  />
                );
              }
            })}
        </Grid>
        <HStack mt="4" spacing="2" justify="center" wrap="wrap">
          <Button
            colorScheme="blue"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}>
            Önceki Sayfa
          </Button>
          <Text>
            Sayfa {currentPage} / {totalPages}
          </Text>
          <Button
            colorScheme="blue"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}>
            Sonraki Sayfa
          </Button>
        </HStack>
      </Box>
    );
  };

  return (
    <>
      {status === "loading" && renderLoading()}
      {status === "failed" && renderError()}
      {status === "succeeded" && renderTvCredits()}
    </>
  );
};

export default PersonTvCredits;
