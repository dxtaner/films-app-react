import React from "react";
import { Flex, IconButton, Box } from "@chakra-ui/react";
import { FaHeart, FaEye } from "react-icons/fa";
import MovieGenres from "./MovieGenres";
import MovieImage from "./MovieImage";

const MovieHeader = ({
  imageUrl,
  originalTitle,
  genres,
  isAuth,
  handleFavoriteClick,
  handleWatchListClick,
}) => (
  <>
    <MovieImage imageUrl={imageUrl} altText={originalTitle} />
    <Box py={4}>
      <Flex
        wrap={"wrap"}
        justifyContent="space-between"
        alignItems="center"
        w="100%">
        <MovieGenres genres={genres} />
        <Flex wrap={"wrap"}>
          {isAuth && (
            <IconButton
              icon={<FaHeart />}
              colorScheme="red"
              mr={2}
              aria-label="Favorilere Ekle"
              onClick={handleFavoriteClick}
            />
          )}
          {isAuth && (
            <IconButton
              icon={<FaEye />}
              colorScheme="blue"
              aria-label="İzlemek İstiyorum"
              onClick={handleWatchListClick}
            />
          )}
        </Flex>
      </Flex>
    </Box>
  </>
);

export default MovieHeader;
