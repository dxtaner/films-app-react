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
  fetchPersonExternalIds, // Dış kimlik bilgilerini alma işlemi
  selectPersonExternalIds, // Dış kimlik bilgilerini seçmek için selektör
} from "../../app/features/actors/personExternalIdsSlice.js"; // Yeni eklenen dış kimlik bilgileri slice'ı

import ActorHeader from "./ActorHeader.js";
import Biography from "./Biography.js";
import SocialIdentityLinks from "./SocialIdentityLinks.js";

// import RightArrow from "./RightArrow.js";
// import LeftArrow from "./LeftArrow.js";

const ActorDetails = () => {
  const dispatch = useDispatch();
  const person = useSelector(selectPerson);
  const status = useSelector(selectPersonStatus);
  const movieCredits = useSelector(selectPersonMovieCredits);
  const externalIds = useSelector(selectPersonExternalIds); // Dış kimlik bilgilerini seçmek
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
      p={3}
      m={2}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      borderColor="teal.300"
      bgColor="white">
      {/* <LeftArrow prevId={actorId - 1} />
      <RightArrow nextId={actorId + 1} /> */}
      <ActorHeader person={person} />
      <Biography biography={person.biography} />
      <SocialIdentityLinks externalIds={externalIds} />
      <PersonCredits movieCredits={movieCredits} />
    </Box>
  );
};

export default ActorDetails;
