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
  const { backdrop_path, original_title, overview, release_date } =
    movieDetails || {};
  const token = sessionStorage.getItem("session_id");
  const isAuth = !!token;

  useEffect(() => {
    if (id) {
      dispatch(getDetails(id));
    }
  }, [dispatch, id]);

  const hasHeaderData = backdrop_path && original_title;
  const hasInfoData = overview && release_date;
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!movieDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <VStack
      fontSize={["md", "lg", "xl", "2xl"]}
      textAlign="center"
      alignItems="stretch"
      p={2}
      spacing={6}>
      {hasHeaderData ? <MovieHeader /> : <Text>No header data available.</Text>}
      {isAuth ? (
        <Button onClick={() => setIsOpen(true)}>Film Reaksiyonları</Button>
      ) : (
        <Text>Please log in to rate the movie.</Text>
      )}
      {hasInfoData ? <MovieInfo /> : <Text>No information available.</Text>}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="rgba(255, 255, 255, 0.8)">
          <ModalHeader>Film Reaksiyonları</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MovieRating />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default MovieDetails;
