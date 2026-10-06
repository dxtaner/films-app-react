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

  return (
    <Box w="100%" maxW="1400px" mx="auto" p={2}>
      <Divider my={4} borderColor="teal.200" />
      <MovieOverview />
      <Flex justify="flex-end" align="center" w="100%" mt={4}>
        <Button
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Icon as={FaYoutube} />}
          colorScheme="red"
          size="lg"
          _hover={{ bg: "red.600" }}
        >
          Fragmanı Oynat
        </Button>
      </Flex>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="4xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg="black" borderRadius="md" p={2}>
          <ModalHeader color="white">Film Fragmanı</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <YoutubeEmbed />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MovieInfo;
