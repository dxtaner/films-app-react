import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollectionById } from "../../app/features/movies/details/movieCollectionSlice";
import { fetchCollectionImagesAsync } from "../../app/features/movies/details/movieCollectionImagesSlice";
import {
  Box,
  Text,
  Heading,
  VStack,
  Image,
  Center,
  Spinner,
  SimpleGrid,
  Badge,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import Title from "../Title/titles";

const MovieCollection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieCollection, isLoading, error } = useSelector(
    (state) => state.movieCollection
  );

  const { images } = useSelector((state) => state.movieCollectionImages);

  useEffect(() => {
    dispatch(fetchCollectionById(id));
    dispatch(fetchCollectionImagesAsync(id));
  }, [dispatch, id]);

  const [selectedImage, setSelectedImage] = useState(null);

  const bg = useColorModeValue("white", "gray.800");
  const overviewBg = useColorModeValue("gray.50", "gray.700");
  const overviewTextBg = useColorModeValue("white", "gray.800");

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">Error fetching data: {error}</Text>
      </Center>
    );
  }

  if (!movieCollection) {
    return (
      <Center h="100vh">
        <Text>No collection data available</Text>
      </Center>
    );
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <VStack
      spacing={8}
      divider={<StackDivider borderColor="gray.200" />}
      align="stretch"
      maxW="1200px"
      mx="auto"
      p={4}
      bg={bg}
      boxShadow="lg"
      borderRadius="lg">
      <Box textAlign="center" m={4}>
        <Title text={`${movieCollection.name} Filmleri`} />
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center" mb={4}>
        <Image
          src={`https://image.tmdb.org/t/p/original${movieCollection.poster_path}`}
          alt="Poster"
          maxHeight="500px"
          borderRadius="lg"
          mx={2}
          boxShadow="md"
        />
      </Box>

      <Box
        p={4}
        borderLeft="5px solid gold"
        borderBottom="5px solid gold"
        borderRadius="lg"
        boxShadow="md"
        bg={overviewBg}>
        <Text
          fontSize="lg"
          fontStyle="italic"
          color="gray.600"
          mb={6}
          p={4}
          bg={overviewTextBg}
          borderRadius="md"
          boxShadow="inner">
          {movieCollection.overview}
        </Text>

        <SimpleGrid
          columns={[1, 2, 3]}
          spacing={[4, 6, 8]}
          mx="auto"
          maxW="90%">
          {movieCollection.parts.map((movie) => (
            <Link key={movie.id} to={`/MovieDetails/${movie.id}`}>
              <Box
                maxW="100%"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                m={2}
                _hover={{ boxShadow: "xl", transform: "scale(1.03)" }}
                transition="0.3s ease-in-out">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  p={4}
                  borderRadius="lg"
                />
                <Box p={3}>
                  <Heading as="h4" size="md" mb={2}>
                    {movie.title} ({movie.release_date.substring(0, 4)})
                  </Heading>
                  <Badge colorScheme="teal" mb={2}>
                    {movie.vote_average.toFixed(2)} / 10
                  </Badge>
                  <Text fontSize="sm" color="gray.600" noOfLines={3}>
                    {movie.overview}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center" mb={4}>
        <Image
          src={`https://image.tmdb.org/t/p/original${movieCollection.backdrop_path}`}
          alt="Backdrop"
          maxHeight="500px"
          borderRadius="lg"
          mx={2}
          boxShadow="md"
        />
      </Box>

      <Title text={`${movieCollection.name} Filminden Fotoğraflar`} />

      <Box display="flex" flexWrap="wrap" justifyContent="center" mb={4}>
        {images && images.backdrops && images.backdrops.length > 0 ? (
          images.backdrops.map((backdrop) => (
            <Box key={backdrop.file_path} mx={2} mb={4} textAlign="center">
              <Image
                key={backdrop.file_path}
                src={`https://image.tmdb.org/t/p/original${backdrop.file_path}`}
                alt="Backdrop"
                maxHeight="200px"
                borderRadius="md"
                mx={2}
                onClick={() => handleImageClick(backdrop)}
                cursor="pointer"
                _hover={{ transform: "scale(1.05)" }}
                transition="0.3s ease-in-out"
              />
            </Box>
          ))
        ) : (
          <Text>No backdrop images available</Text>
        )}
      </Box>

      <Title text={`${movieCollection.name} Filminin Afişleri`} />

      <Box display="flex" flexWrap="wrap" justifyContent="center" mb={4}>
        {images && images.posters && images.posters.length > 0 ? (
          images.posters.map((poster) => (
            <Box key={poster.file_path} mx={2} mb={4} textAlign="center">
              <Image
                key={poster.file_path}
                src={`https://image.tmdb.org/t/p/original${poster.file_path}`}
                alt="Poster"
                maxHeight="200px"
                borderRadius="md"
                mx={2}
                onClick={() => handleImageClick(poster)}
                cursor="pointer"
                _hover={{ transform: "scale(1.05)" }}
                transition="0.3s ease-in-out"
              />
            </Box>
          ))
        ) : (
          <Text>No poster images available</Text>
        )}
      </Box>

      {selectedImage && (
        <Box
          pos="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="rgba(0, 0, 0, 0.8)"
          borderRadius="md"
          p={4}
          zIndex="modal"
          onClick={() => setSelectedImage(null)}>
          <Box textAlign="right" mb={4}>
            <Text fontWeight={800} fontSize="md" color="white">
              {selectedImage.vote_average.toFixed(1)} / 10
            </Text>
          </Box>
          <Image
            src={`https://image.tmdb.org/t/p/original${selectedImage.file_path}`}
            alt="Selected Image"
            borderRadius="md"
            maxW="90vw"
            maxH="90vh"
          />
        </Box>
      )}
    </VStack>
  );
};

export default MovieCollection;
