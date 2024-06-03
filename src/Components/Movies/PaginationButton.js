import React from "react";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const PaginationButton = ({
  currentPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
}) => {
  return (
    <Flex justify="center" mt={4}>
      <IconButton
        colorScheme="pink"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        icon={<ArrowBackIcon />}
        mr={2}
      />
      <Button
        colorScheme="green"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        rightIcon={<ArrowForwardIcon />}>
        Sonraki
      </Button>
    </Flex>
  );
};

export default PaginationButton;
