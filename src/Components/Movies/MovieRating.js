import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import StarRating from "./StarRating";

const MovieRating = ({ isAuth, rating, setRating, movieId }) => (
  <Flex
    justifyContent="space-between"
    wrap={"wrap"}
    alignItems="center"
    w="100%">
    <Box>
      {isAuth && (
        <StarRating
          value={rating}
          movieDetailsId={movieId}
          onRatingChange={setRating}
        />
      )}
    </Box>
    <Box textAlign="right">
      {isAuth ? (
        rating > 0 ? (
          <Text fontSize="lg" fontWeight="bold" color="gray.600">
            Puanım: {"★".repeat(rating)}
          </Text>
        ) : (
          <Text fontSize="lg" fontWeight="bold" color="gray.600">
            Henüz derecelendirmem yok
          </Text>
        )
      ) : (
        <Text fontSize="lg" fontWeight="bold" color="gray.600">
          Giriş yaparak puan verebilirsiniz
        </Text>
      )}
    </Box>
  </Flex>
);

export default MovieRating;
