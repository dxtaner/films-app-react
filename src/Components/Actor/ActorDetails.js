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
    switch (status) {
      case "loading":
        return (
          <VStack justify="center" align="center" spacing={4}>
            <Spinner size="xl" color="teal.500" />
            <Text>Loading...</Text>
          </VStack>
        );
      case "failed":
        return (
          <Box justify="center" align="center">
            <Text fontSize="xl" color="red.500">
              Failed to load actor details.
            </Text>
          </Box>
        );
      default:
        return (
          <Container maxW="container.xl">
            <Box py={8}>
              <ActorHeader person={person} />
              <Divider my={8} />
              <Biography biography={person.biography} />
              <Divider my={8} />
              <PersonImages />
              <Divider my={8} />
              <PersonMovieCredits />
              <Divider my={8} />
              <PersonTvCredits />
            </Box>
          </Container>
        );
    }
  };

  return renderContent();
};

export default ActorDetails;
