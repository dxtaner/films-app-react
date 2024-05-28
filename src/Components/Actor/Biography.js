import React, { useEffect, useState } from "react";
import { Text, VStack, Heading, Box, Link, Flex } from "@chakra-ui/react";
import SocialIdentityLinks from "./SocialIdentityLinks";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPersonExternalIds,
  selectPersonExternalIds,
} from "../../app/features/actors/personExternalIdsSlice";
import { useParams } from "react-router-dom";

function Biography({ biography }) {
  const [expanded, setExpanded] = useState(false);
  const previewLength = 255;
  const dispatch = useDispatch();
  const { id } = useParams();

  const shortenBiography = (text) => {
    return text.length > previewLength
      ? text.slice(0, previewLength) + "..."
      : text;
  };

  const externalIds = useSelector(selectPersonExternalIds);
  useEffect(() => {
    if (id) {
      dispatch(fetchPersonExternalIds(id));
    }
  }, [dispatch, id]);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Box p={6} borderRadius="lg" bg="white" boxShadow="md">
      <Flex
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
        direction={{ base: "column", md: "row" }}
        mb={4}>
        <Heading as="h2" size="lg" mb={{ base: 2, md: 0 }}>
          Biyografi
        </Heading>
        <SocialIdentityLinks externalIds={externalIds} />
      </Flex>
      <VStack spacing={4} align="start">
        {biography ? (
          <>
            <Text fontSize="lg" color="gray.700" overflowWrap="break-word">
              {expanded ? biography : shortenBiography(biography)}
            </Text>
            {biography.length > previewLength && (
              <Link color="blue.500" onClick={handleExpand} cursor="pointer">
                {expanded ? "Daha az göster" : "Daha fazla göster"}
              </Link>
            )}
          </>
        ) : (
          <Text fontSize="lg" color="gray.700">
            Biyografi mevcut değil.
          </Text>
        )}
      </VStack>
    </Box>
  );
}

export default Biography;
