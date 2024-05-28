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
    dispatch(fetchPersonImagesAsync(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleImageClick = (index) => {
    setSelectedImage(images.profiles[index]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {status === "loading" && (
          <Center mt={4}>
            <Spinner size="xl" color="blue.500" />
          </Center>
        )}
        {status === "idle" && error && (
          <Center mt={4}>
            <Alert status="error" variant="solid" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          </Center>
        )}
        {images &&
          images.profiles &&
          images.profiles.map((profile, index) => (
            <Image
              key={index}
              src={`https://image.tmdb.org/t/p/w200${profile.file_path}`}
              alt={`Profile ${index}`}
              m={2}
              bg={"black"}
              cursor="pointer"
              borderRadius="md"
              boxShadow="lg"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
              onClick={() => handleImageClick(index)}
            />
          ))}
      </Box>
      {selectedImage && (
        <Modal isOpen={true} onClose={closeModal} size="2xl">
          <ModalOverlay bg="blackAlpha.800" />
          <ModalContent bg="black" color="white">
            <ModalBody p={4}>
              <CloseButton
                position="absolute"
                top={2}
                right={2}
                onClick={closeModal}
                color="white"
                size="lg"
              />
              <Center>
                <Image
                  src={`https://image.tmdb.org/t/p/original${selectedImage.file_path}`}
                  alt="Selected"
                  w="full"
                  h="full"
                  objectFit="contain"
                  borderRadius="md"
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
