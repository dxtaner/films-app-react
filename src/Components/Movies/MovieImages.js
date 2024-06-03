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
    (state) => state.movieImages
  );

  const [selectedCategory, setSelectedCategory] = useState("backdrops");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMovieImages(id));
  }, [dispatch, id]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const renderImages = (images, title) => (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
      {images.map((image) => (
        <Box
          key={image.file_path}
          onClick={() => handleImageClick(image)}
          cursor="pointer"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.05)" }}>
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

  const noImages = !backdrops.length && !logos.length && !posters.length;

  return (
    <Box p={4} overflowY="auto" maxHeight={600}>
      {status === "loading" && noImages && (
        <Center py={6}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}

      {status === "failed" && (
        <Center py={6}>
          <Text color="red.500">Error: {error}</Text>
        </Center>
      )}

      {status === "succeeded" && noImages && (
        <Center py={6}>
          <Text>No images available.</Text>
        </Center>
      )}

      {status === "succeeded" && !noImages && (
        <>
          <ButtonGroup
            mb={4}
            spacing={4}
            flexWrap="wrap"
            justifyContent="center">
            <Button
              colorScheme={selectedCategory === "backdrops" ? "blue" : "gray"}
              onClick={() => setSelectedCategory("backdrops")}>
              Arka Planlar
            </Button>
            <Button
              colorScheme={selectedCategory === "logos" ? "blue" : "gray"}
              onClick={() => setSelectedCategory("logos")}>
              Logolar
            </Button>
            <Button
              colorScheme={selectedCategory === "posters" ? "blue" : "gray"}
              onClick={() => setSelectedCategory("posters")}>
              Afişler
            </Button>
          </ButtonGroup>

          {selectedCategory === "backdrops" &&
            renderImages(backdrops, "Arka Planlar")}
          {selectedCategory === "logos" && renderImages(logos, "Logolar")}
          {selectedCategory === "posters" && renderImages(posters, "Afişler")}
        </>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            {selectedImage && (
              <Image
                src={`https://image.tmdb.org/t/p/original${selectedImage.file_path}`}
                alt={selectedImage.file_path}
                w="full"
                h="full"
                objectFit="contain"
                borderRadius="md"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MovieImages;
