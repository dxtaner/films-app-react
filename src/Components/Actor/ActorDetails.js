import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  VStack,
  Spinner,
  Text,
  Divider,
  Container,
} from "@chakra-ui/react";
import {
  fetchPersonInfo,
  selectPerson,
  selectPersonStatus,
} from "../../app/features/actors/personSlice";
import { useParams } from "react-router-dom";

import ActorHeader from "./ActorHeader";
import Biography from "./Biography";
import PersonImages from "./PersonImages";
import PersonMovieCredits from "./PersonMovieCredits";
import PersonTvCredits from "./PersonTvCredits";

const ActorDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const person = useSelector(selectPerson);
  const status = useSelector(selectPersonStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchPersonInfo(id));
    }
  }, [dispatch, id]);

  if (status === "loading" || !person) {
    return (
      <VStack justify="center" align="center" minH="50vh" spacing={4}>
        <Spinner size="xl" color="red.500" thickness="4px" />
        <Text fontSize="xl" color="gray.300">
          Oyuncu Bilgileri Yükleniyor...
        </Text>
      </VStack>
    );
  }

  if (status === "failed") {
    return (
      <Box textAlign="center" py={12}>
        <Text fontSize="xl" color="red.400">
          Oyuncu detayları yüklenirken bir hata oluştu.
        </Text>
      </Box>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box
        bg="gray.900"
        p={{ base: 4, md: 8 }}
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.800"
        boxShadow="2xl"
      >
        {/* Güvenli veri aktarımı */}
        {person?.id && <ActorHeader person={person} />}

        {person?.biography && (
          <>
            <Divider my={8} borderColor="gray.800" />
            <Biography biography={person.biography} />
          </>
        )}

        <Divider my={8} borderColor="gray.800" />
        <PersonImages />

        <Divider my={8} borderColor="gray.800" />
        <PersonMovieCredits />

        <Divider my={8} borderColor="gray.800" />
        <PersonTvCredits />
      </Box>
    </Container>
  );
};

export default ActorDetails;
