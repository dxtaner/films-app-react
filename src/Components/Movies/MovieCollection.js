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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import Title from "../Title/titles";

const MovieCollection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieCollection, isLoading, error } = useSelector(
    (state) => state.movieCollection,
  );
  const { images } = useSelector((state) => state.movieCollectionImages);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  const bg = useColorModeValue("white", "gray.800");
  const overviewBg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    if (id) {
      dispatch(fetchCollectionById(id));
      dispatch(fetchCollectionImagesAsync(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">Veri yüklenirken hata oluştu: {error}</Text>
      </Center>
    );
  }

  if (!movieCollection) {
    return (
      <Center h="100vh">
        <Text color="gray.500">Koleksiyon verisi bulunamadı.</Text>
      </Center>
    );
  }

  const handleImageClick = (imageObj) => {
    setSelectedImage(imageObj);
    onOpen();
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
      borderRadius="lg"
    >
      <Box textAlign="center" m={4}>
        <Title text={`${movieCollection.name} Filmleri`} />
      </Box>

      {movieCollection.poster_path && (
        <Box display="flex" justifyContent="center" mb={4}>
          <Image
            src={`https://image.tmdb.org/t/p/original${movieCollection.poster_path}`}
            alt={movieCollection.name}
            maxH="400px"
            borderRadius="lg"
            boxShadow="md"
          />
        </Box>
      )}

      <Box p={6} borderRadius="lg" boxShadow="md" bg={overviewBg}>
        {movieCollection.overview && (
          <Text fontSize="lg" fontStyle="italic" color="gray.600" mb={6}>
            {movieCollection.overview}
          </Text>
        )}

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {movieCollection.parts?.map((movie) => (
            <Link key={movie.id} to={`/MovieDetails/${movie.id}`}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg="white"
                _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }}
                transition="0.3s ease-in-out"
                h="100%"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  w="100%"
                  h="350px"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Heading as="h4" size="md" mb={2} noOfLines={1}>
                    {movie.title} (
                    {movie.release_date
                      ? movie.release_date.substring(0, 4)
                      : "N/A"}
                    )
                  </Heading>
                  {movie.vote_average > 0 && (
                    <Badge colorScheme="teal" mb={2}>
                      {movie.vote_average.toFixed(1)} / 10
                    </Badge>
                  )}
                  <Text fontSize="sm" color="gray.600" noOfLines={3}>
                    {movie.overview}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Box>

      {images?.backdrops?.length > 0 && (
        <>
          <Title text={`${movieCollection.name} - Arka Planlar`} />
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
            {images.backdrops.map((backdrop) => (
              <Image
                key={backdrop.file_path}
                src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}
                alt="Backdrop"
                borderRadius="md"
                cursor="pointer"
                _hover={{ transform: "scale(1.03)" }}
                transition="0.3s"
                onClick={() => handleImageClick(backdrop)}
              />
            ))}
          </SimpleGrid>
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton color="white" zIndex={2} />
          <ModalBody
            p={0}
            display="flex"
            justifyContent="center"
            position="relative"
          >
            {selectedImage && (
              <Image
                src={`https://image.tmdb.org/t/p/original${selectedImage.file_path}`}
                alt="Büyük Görsel"
                borderRadius="lg"
                maxH="85vh"
                objectFit="contain"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default MovieCollection;
