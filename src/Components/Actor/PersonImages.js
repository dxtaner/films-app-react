import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Center,
  CloseButton,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  fetchPersonImagesAsync,
  selectPersonImages,
  selectPersonImagesError,
  selectPersonImagesStatus,
} from "../../app/features/actors/personImagesSlice";
import { useParams } from "react-router-dom";

const PersonImages = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const images = useSelector(selectPersonImages);
  const status = useSelector(selectPersonImagesStatus);
  const error = useSelector(selectPersonImagesError);
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (id) {
      dispatch(fetchPersonImagesAsync(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Hata",
        description: error,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return (
    <Box
      bg="gray.800"
      p={6}
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.700"
    >
      {status === "loading" && (
        <Center py={6}>
          <Spinner size="lg" color="red.500" />
        </Center>
      )}

      {status === "idle" && error && (
        <Alert
          status="error"
          variant="subtle"
          borderRadius="md"
          bg="red.900"
          color="red.200"
        >
          <AlertIcon color="red.400" />
          {error}
        </Alert>
      )}

      {images && images.profiles && images.profiles.length > 0 && (
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={4}>
          {images.profiles.map((profile, index) => (
            <Image
              key={index}
              src={`https://image.tmdb.org/t/p/w185${profile.file_path}`}
              alt={`Profile ${index}`}
              borderRadius="lg"
              objectFit="cover"
              h="200px"
              w="100%"
              cursor="pointer"
              transition="transform 0.2s, border-color 0.2s"
              border="2px solid transparent"
              _hover={{ transform: "scale(1.05)", borderColor: "red.500" }}
              onClick={() => setSelectedImage(profile)}
            />
          ))}
        </SimpleGrid>
      )}

      {selectedImage && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedImage(null)}
          size="xl"
          isCentered
        >
          <ModalOverlay bg="blackAlpha.850" backdropFilter="blur(5px)" />
          <ModalContent
            bg="gray.900"
            color="white"
            border="1px solid"
            borderColor="gray.700"
          >
            <ModalBody p={2} position="relative">
              <CloseButton
                position="absolute"
                top={3}
                right={3}
                onClick={() => setSelectedImage(null)}
                color="white"
                bg="blackAlpha.600"
                _hover={{ bg: "red.600" }}
                zIndex={10}
              />
              <Center p={2}>
                <Image
                  src={`https://image.tmdb.org/t/p/original${selectedImage.file_path}`}
                  alt="Full size"
                  maxH="80vh"
                  borderRadius="md"
                  objectFit="contain"
                />
              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default PersonImages;
