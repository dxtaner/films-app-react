import SimilarCard from "../../Components/Cards/SimilarCard";
import { useEffect } from "react";
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
  const status = useSelector((state) => state.similar.status);
  const error = useSelector((state) => state.similar.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchSimilarMovies(id));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <Flex justify="center" align="center" h="200px">
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  if (status === "failed") {
    return (
      <Flex justify="center" align="center" h="150px">
        <Text color="red.400">
          {error || "Similar movies could not be retrieved.."}
        </Text>
      </Flex>
    );
  }

  if (status === "succeeded" && similarMovies.length === 0) {
    return (
      <Flex justify="center" align="center" h="150px">
        <Text color="gray.500">No similar movies found.</Text>
      </Flex>
    );
  }

  return (
    <Box
      overflowX="auto"
      p={3}
      css={{
        "&::-webkit-scrollbar": {
          height: "8px",
        },

        "&::-webkit-scrollbar-thumb": {
          background: "#CBD5E0",
          borderRadius: "4px",
        },
      }}
    >
      <Flex gap={4}>
        {similarMovies.map((movie) => (
          <SimilarCard key={movie.id} movie={movie} />
        ))}
      </Flex>
    </Box>
  );
};

export default SimilarMovies;
