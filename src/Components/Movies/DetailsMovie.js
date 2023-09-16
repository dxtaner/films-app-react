import {
  Box,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import YoutubeEmbed from "../Youtube/YoutubeEmbed.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetails,
  addToFavorites,
  detailsList,
} from "../../app/features/movies/details/detailsSlice.js";
import {
  getTrailer,
  trailerList,
} from "../../app/features/movies/details/trailerSlice.js";
import { AiOutlineHeart } from "react-icons/ai";
import Title from "../Title/titles.js";

const Details = () => {
  const dispatch = useDispatch();
  const movieDetails = useSelector(detailsList);
  const movieTrailer = useSelector(trailerList);
  const location = useLocation();
  const isAuth = sessionStorage.getItem("session_id");

  useEffect(() => {
    dispatch(getDetails(location.state.id));
    dispatch(getTrailer(location.state.id));
  }, [dispatch, location.state.id]);

  return (
    <>
      <Box>
        <Image
          src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
          alt={movieDetails.original_title}
          cursor="pointer"
        />
      </Box>
      <VStack
        spacing={4}
        p={[2, 2, 4, 4]}
        fontSize={["sm", "md", "lg", "xl"]}
        textAlign="center">
        <HStack>
          {movieDetails?.genres?.map((gen, index) => (
            <Tag
              key={index}
              colorScheme="red"
              bg="gray.300"
              borderRadius="lg"
              p={[1, 1, 2, 2]}>
              {gen.name}
            </Tag>
          ))}
        </HStack>

        <Box
          textAlign="center"
          p={6}
          boxShadow="lg"
          borderRadius="lg"
          bg="gray.300">
          <Heading fontSize="2xl" mb={4}>
            {movieDetails.original_title}
          </Heading>

          <Text fontSize="lg" mb={4}>
            {movieDetails.overview}
          </Text>

          <HStack spacing={4} justifyContent="center">
            <Text fontSize="md">
              <strong>Beğeni Sayısı:</strong> {movieDetails.vote_count}
            </Text>
            <Text fontSize="md">
              <strong>Oy Ortalaması:</strong> {movieDetails.vote_average}
            </Text>
          </HStack>

          <HStack spacing={4} mt={4} justifyContent="center">
            <Text fontSize="md">
              <strong>Çıkış Tarihi:</strong> {movieDetails.release_date}
            </Text>
          </HStack>
        </Box>

        {isAuth && (
          <Box>
            <Button
              leftIcon={<AiOutlineHeart />}
              colorScheme="red"
              onClick={() => dispatch(addToFavorites(location.state.id, true))}>
              Favori Filmlere Ekle
            </Button>
          </Box>
        )}

        <Box width="full">
          <Title text="Trailer"></Title>
          {movieTrailer.length > 0 ? (
            <YoutubeEmbed embedId={movieTrailer[0].key} />
          ) : (
            <Text fontSize="lg">Bu filmin fragmanı yok</Text>
          )}
        </Box>
      </VStack>
    </>
  );
};

export default Details;
