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
  const previewLength = 300;
  const dispatch = useDispatch();
  const { id } = useParams();

  const externalIds = useSelector(selectPersonExternalIds);

  useEffect(() => {
    if (id) {
      dispatch(fetchPersonExternalIds(id));
    }
  }, [dispatch, id]);

  const shortenBiography = (text) => {
    return text.length > previewLength
      ? text.slice(0, previewLength) + "..."
      : text;
  };

  return (
    <Box
      p={6}
      borderRadius="xl"
      bg="gray.800"
      border="1px solid"
      borderColor="gray.700"
    >
      <Flex
        justify="space-between"
        align={{ base: "start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        mb={4}
        gap={4}
      >
        <Heading as="h2" size="lg" color="white" fontWeight="bold">
          Biyografi
        </Heading>
        <SocialIdentityLinks externalIds={externalIds} />
      </Flex>

      <VStack spacing={3} align="start">
        {biography ? (
          <>
            <Text fontSize="md" color="gray.300" lineHeight="relaxed">
              {expanded ? biography : shortenBiography(biography)}
            </Text>
            {biography.length > previewLength && (
              <Link
                color="red.400"
                fontWeight="bold"
                onClick={() => setExpanded(!expanded)}
                cursor="pointer"
                _hover={{ color: "red.300", textDecoration: "underline" }}
              >
                {expanded ? "Daha az göster" : "Daha fazla göster"}
              </Link>
            )}
          </>
        ) : (
          <Text fontSize="md" color="gray.500">
            Biyografi bilgisi mevcut değil.
          </Text>
        )}
      </VStack>
    </Box>
  );
}

export default Biography;
