import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, VStack, Spinner, Text, Divider } from "@chakra-ui/react";
import {
  fetchPersonInfo,
  selectPerson,
  selectPersonStatus,
} from "../../app/features/actors/personSlice";
import {
  fetchPersonMovieCredits,
  selectPersonMovieCredits,
} from "../../app/features/actors/personMoviesSlice";
import { useParams } from "react-router-dom";
import PersonCredits from "./PersonCredits";
import {
  fetchPersonExternalIds,
  selectPersonExternalIds,
} from "../../app/features/actors/personExternalIdsSlice";
import ActorHeader from "./ActorHeader";
import Biography from "./Biography";
import SocialIdentityLinks from "./SocialIdentityLinks";

const ActorDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const person = useSelector(selectPerson);
  const status = useSelector(selectPersonStatus);
  const movieCredits = useSelector(selectPersonMovieCredits);
  const externalIds = useSelector(selectPersonExternalIds);

  useEffect(() => {
    if (id) {
      dispatch(fetchPersonInfo(id));
      dispatch(fetchPersonMovieCredits(id));
      dispatch(fetchPersonExternalIds(id));
    }
  }, [dispatch, id]);

  const renderContent = () => {
    if (status === "loading") {
      return (
        <VStack justify="center" align="center" spacing={4}>
          <Spinner size="xl" color="teal.500" />
          <Text>Loading...</Text>
        </VStack>
      );
    }

    if (status === "failed") {
      return (
        <Box justify="center" align="center">
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
        <Divider />
        <Biography biography={person.biography} />
        <Divider />
        <SocialIdentityLinks externalIds={externalIds} />
        <Divider />
        <PersonCredits movieCredits={movieCredits} />
      </Box>
    );
  };

  return renderContent();
};

export default ActorDetails;
