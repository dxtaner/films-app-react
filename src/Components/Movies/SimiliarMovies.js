import SimilarCard from "../../Components/Cards/SimilarCard";
import React, { useEffect } from "react";
import { Text, Flex, Spinner, Box } from "@chakra-ui/react";
import {
  fetchSimilarMovies,
  selectSimilarMovies,
} from "../../app/features/movies/details/similarSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const SimilarMovies = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const similarMovies = useSelector(selectSimilarMovies);

  useEffect(() => {
    dispatch(fetchSimilarMovies(id));
  }, [dispatch, id]);

  if (!similarMovies) {
    return (
      <Flex justify="center" align="center" h="200px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (similarMovies.length === 0) {
    return (
      <Flex justify="center" align="center" h="200px">
        <Text>No similar movies found.</Text>
      </Flex>
    );
  }

  return (
    <Box overflowX="auto" p={3}>
      <Flex>
        {similarMovies.map((movie, index) => (
          <SimilarCard key={index} movie={movie} />
        ))}
      </Flex>
    </Box>
  );
};

export default SimilarMovies;
