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
      bg="gray.50"
      m={2}
      p={4}
      rounded="md"
      boxShadow="md">
      <Box mb={10}>
        {status === "loading" && <Spinner size="lg" />}
        {status === "failed" && (
          <Alert status="error" mb={4} rounded="md">
            <AlertIcon />
            {error ||
              "Anahtar kelimeler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."}
          </Alert>
        )}
      </Box>
      {status === "succeeded" && keywords.length === 0 && (
        <Box mb={4}>
          <Alert status="info" rounded="md">
            <AlertIcon />
            Anahtar kelimeler bulunamadı.
          </Alert>
        </Box>
      )}
      {status === "succeeded" && keywords.length > 0 && (
        <Flex flexWrap="wrap" justifyContent="center">
          {keywords.map((keyword) => (
            <Tooltip key={keyword.id} label={keyword.name} placement="top">
              <Tag
                size="lg"
                variant="solid"
                colorScheme="gray"
                cursor="pointer"
                m={2}
                p={2}
                rounded="md">
                {keyword.name}
              </Tag>
            </Tooltip>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default MovieKeywords;
