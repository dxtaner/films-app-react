import React, { useEffect, useState } from "react";
import {
  VStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MovieHeader from "./MovieHeader";
import MovieInfo from "./MovieInfo";
import {
  detailsList,
  getDetails,
} from "../../app/features/movies/details/detailsSlice";
import MovieRating from "./MovieRating";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movieDetails = useSelector(detailsList);
  const token = sessionStorage.getItem("session_id");
  const isAuth = !!token;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getDetails(id));
    }
  }, [dispatch, id]);

  if (!movieDetails) {
    return (
      <Center h="50vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <VStack
      textAlign="center"
      alignItems="stretch"
      p={4}
      spacing={6}
      maxW="1400px"
      mx="auto"
    >
      <MovieHeader />
      {isAuth ? (
        <Button
          colorScheme="blue"
          size="lg"
          onClick={() => setIsOpen(true)}
          mx="auto"
        >
          Film Reaksiyonları
        </Button>
      ) : (
        <Text color="gray.500">Filmi oylamak için lütfen giriş yapın.</Text>
      )}
      <MovieInfo />

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isCentered
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Film Reaksiyonları</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MovieRating />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setIsOpen(false)}>
              Kapat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default MovieDetails;
