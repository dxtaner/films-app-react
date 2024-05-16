import React from "react";
import { Flex, Button, Box } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <Box mt={8} textAlign="center">
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          isDisabled={currentPage === 0}
          colorScheme="red"
          size="sm"
          mb={2}
          borderRadius="full"
          width="100px"
          height="40px"
          fontSize="lg"
          fontWeight="bold">
          Önceki
        </Button>
        <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentPage(index)}
              variant={currentPage === index ? "solid" : "outline"}
              colorScheme="blue"
              size="sm"
              mx={1}
              mb={2}
              borderRadius="full"
              width="40px"
              height="40px"
              fontSize="lg"
              fontWeight="bold">
              {index + 1}
            </Button>
          ))}
        </Flex>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          isDisabled={currentPage === totalPages - 1}
          colorScheme="green"
          size="sm"
          mt={2}
          borderRadius="full"
          width="100px"
          height="40px"
          fontSize="lg"
          fontWeight="bold">
          Sonraki
        </Button>
      </Flex>
    </Box>
  );
};

export default Pagination;
