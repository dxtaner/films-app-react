import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import MovieOverview from "./MovieOverview";
import YoutubeEmbed from "../Youtube/YoutubeEmbed";
import { FaYoutube } from "react-icons/fa";

const MovieInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box w="100%" maxW="1500px" mx="auto" p={2}>
      <Divider my={4} bg="teal.100" />
      <MovieOverview />
      <Flex justify="flex-end" align="flex-start" w="100%" p={2}>
        <Button
          onClick={handleOpenModal}
          leftIcon={<Icon as={FaYoutube} />}
          colorScheme="red"
          variant="solid"
          size="lg"
          _hover={{ bg: "red.600" }}
          _active={{ bg: "red.700" }}>
          Fragmanı Oynat
        </Button>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="5xl">
        <ModalOverlay />
        <ModalContent bg="black" borderRadius="md">
          <ModalHeader color="white">Movie Trailer</ModalHeader>
          <ModalCloseButton color="red" />
          <ModalBody>
            <Box width="100%" height="100%">
              <YoutubeEmbed />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MovieInfo;
