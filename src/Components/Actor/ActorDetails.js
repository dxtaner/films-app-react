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

  const renderContent = () => {
    if (status === "loading") {
      return (
        <VStack justify="center" align="center" spacing={4} py={10}>
          <Spinner size="xl" color="teal.500" />
          <Text fontSize="xl" color="teal.500">
            Loading...
          </Text>
        </VStack>
      );
    }

    if (status === "failed") {
      return (
        <Box textAlign="center" py={10}>
          <Text fontSize="xl" color="red.500">
            Failed to load actor details.
          </Text>
        </Box>
      );
    }

    if (!person) {
      return null;
    }

    return (
      <Container maxW="container.xl" py={10}>
        <Box bg="gray.50" p={8} borderRadius="md" boxShadow="md">
          <ActorHeader person={person} />
          <Divider my={8} borderColor="teal.500" />
          <Biography biography={person.biography} />
          <Divider my={8} borderColor="teal.500" />
          <PersonImages />
          <Divider my={8} borderColor="teal.500" />
          <PersonMovieCredits />
          <Divider my={8} borderColor="teal.500" />
          <PersonTvCredits />
        </Box>
      </Container>
    );
  };

  return renderContent();
};

export default ActorDetails;
