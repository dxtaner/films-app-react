import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieImages } from "../../app/features/movies/details/movieImagesSlice";
import {
  Box,
  Spinner,
  SimpleGrid,
  Image,
  Text,
  Center,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const MovieImages = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { backdrops, logos, posters, status, error } = useSelector(
    (state) => state.movieImages,
  );

  const [selectedCategory, setSelectedCategory] = useState("backdrops");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieImages(id));
    }
  }, [dispatch, id]);

  const renderImages = (images = [], title) => {
    if (images.length === 0) {
      return (
        <Text color="gray.500" textAlign="center">
          Bu kategoride görsel yok.
        </Text>
      );
    }
    return (
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
        {images.map((image) => (
          <Box
            key={image.file_path}
            onClick={() => setSelectedImage(image)}
            cursor="pointer"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.03)" }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              alt={title}
              borderRadius="md"
              boxShadow="md"
            />
          </Box>
        ))}
      </SimpleGrid>
    );
  };

  const noImages = !backdrops?.length && !logos?.length && !posters?.length;

  if (status === "loading" && noImages) {
    return (
      <Center py={10}>
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (status === "failed") {
    return (
      <Center py={10}>
        <Text color="red.500">Hata: {error}</Text>
      </Center>
    );
  }

  return (
    <Box p={4}>
      {!noImages && (
        <ButtonGroup mb={6} spacing={4} display="flex" justifyContent="center">
          <Button
            colorScheme={selectedCategory === "backdrops" ? "blue" : "gray"}
            onClick={() => setSelectedCategory("backdrops")}
          >
            Arka Planlar
          </Button>
          <Button
            colorScheme={selectedCategory === "logos" ? "blue" : "gray"}
            onClick={() => setSelectedCategory("logos")}
          >
            Logolar
          </Button>
          <Button
            colorScheme={selectedCategory === "posters" ? "blue" : "gray"}
            onClick={() => setSelectedCategory("posters")}
          >
            Afişler
          </Button>
        </ButtonGroup>
      )}

      {selectedCategory === "backdrops" && renderImages(backdrops, "Arka Plan")}
      {selectedCategory === "logos" && renderImages(logos, "Logo")}
      {selectedCategory === "posters" && renderImages(posters, "Afiş")}

      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        size="4xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton color="white" zIndex={2} />
          <ModalBody p={0} display="flex" justifyContent="center">
            {selectedImage && (
              <Image
                src={`https://image.tmdb.org/t/p/original${selectedImage.file_path}`}
                alt="Seçilen Görsel"
                borderRadius="md"
                maxH="85vh"
                objectFit="contain"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MovieImages;
