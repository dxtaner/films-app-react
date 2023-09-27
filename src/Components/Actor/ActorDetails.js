import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPersonInfo,
  selectPerson,
  selectPersonStatus,
} from "../../app/features/actors/personSlice.js";
import { Box, Text, Spinner, VStack } from "@chakra-ui/react";
import {
  fetchPersonMovieCredits,
  selectPersonMovieCredits,
} from "../../app/features/actors/personMoviesSlice.js";
import { useLocation } from "react-router-dom";
import PersonCredits from "./PersonCredits.js";
import {
  fetchPersonExternalIds,
  selectPersonExternalIds,
} from "../../app/features/actors/personExternalIdsSlice.js";
import ActorHeader from "./ActorHeader.js";
import Biography from "./Biography.js";
import SocialIdentityLinks from "./SocialIdentityLinks.js";

const ActorDetails = () => {
  const dispatch = useDispatch();
  const person = useSelector(selectPerson);
  const status = useSelector(selectPersonStatus);
  const movieCredits = useSelector(selectPersonMovieCredits);
  const externalIds = useSelector(selectPersonExternalIds);
  const location = useLocation();
  const actorId = location.state.id;

  useEffect(() => {
    dispatch(fetchPersonInfo(actorId));
    dispatch(fetchPersonMovieCredits(actorId));
    dispatch(fetchPersonExternalIds(actorId));
  }, [dispatch, actorId]);

  if (status === "loading") {
    return (
      <VStack spacing={4} align="center">
        <Spinner size="xl" color="teal.500" />
        <Text>Loading...</Text>
      </VStack>
    );
  }

  if (status === "failed") {
    return (
      <Box>
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
    <Box
      p={["2", "2", "3", "3", "4"]}
      m={["1", "1", "2", "2", "3"]}
      borderWidth={["1px", "1px", "2px", "2px", "3px"]}
      borderRadius={["md", "md", "lg", "lg", "xl"]}
      boxShadow={["sm", "sm", "md", "md", "lg"]}
      borderColor="teal.400"
      bgColor="white">
      <ActorHeader person={person} movieCreditsLength={movieCredits.length} />
      <Biography biography={person.biography} />
      <SocialIdentityLinks externalIds={externalIds} />
      <PersonCredits movieCredits={movieCredits} />
    </Box>
  );
};

export default ActorDetails;
