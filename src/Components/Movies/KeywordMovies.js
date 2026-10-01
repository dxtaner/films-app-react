import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Flex,
  Box,
  Spinner,
  Alert,
  Tag,
  AlertIcon,
  Tooltip,
} from "@chakra-ui/react";
import { fetchMovieKeywords } from "../../app/features/movies/details/movieKeywordSlice";
import { useParams } from "react-router-dom";

const MovieKeywords = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const keywords = useSelector((state) => state.movieKeywords.keywords) || [];
  const status = useSelector((state) => state.movieKeywords.status);
  const error = useSelector((state) => state.movieKeywords.error);

  useEffect(() => {
    dispatch(fetchMovieKeywords(id));
  }, [dispatch, id]);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="gray.900"
      m={2}
      p={6}
      rounded="xl"
      border="1px solid"
      borderColor="gray.800"
    >
      <Box mb={4}>
        {status === "loading" && (
          <Spinner size="lg" color="red.600" thickness="4px" />
        )}
        {status === "failed" && (
          <Alert status="error" bg="red.900" color="red.100" rounded="lg">
            <AlertIcon />
            {error ||
              "Anahtar kelimeler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."}
          </Alert>
        )}
      </Box>
      {status === "succeeded" && keywords.length === 0 && (
        <Box mb={2}>
          <Alert status="info" bg="gray.800" color="gray.300" rounded="lg">
            <AlertIcon color="gray.400" />
            Anahtar kelimeler bulunamadı.
          </Alert>
        </Box>
      )}
      {status === "succeeded" && keywords.length > 0 && (
        <Flex flexWrap="wrap" justifyContent="center" gap={2}>
          {keywords.map((keyword) => (
            <Tooltip
              key={keyword.id}
              label={keyword.name}
              placement="top"
              bg="gray.800"
              color="white"
            >
              <Tag
                size="md"
                variant="solid"
                bg="gray.800"
                color="gray.200"
                border="1px solid"
                borderColor="gray.700"
                cursor="pointer"
                px={3}
                py={2}
                rounded="lg"
                _hover={{
                  bg: "red.600",
                  color: "white",
                  borderColor: "red.500",
                }}
                transition="all 0.2s"
              >
                #{keyword.name}
              </Tag>
            </Tooltip>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default MovieKeywords;
