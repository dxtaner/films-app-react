import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../app/features/movies/details/reviewsSlice";
import {
  Box,
  Text,
  Link,
  VStack,
  Spinner,
  Avatar,
  Badge,
  Flex,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const ReviewsMovie = () => {
  const dispatch = useDispatch();
  const { movieReviews, status, error } = useSelector(
    (state) => state.movieReviews
  );
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 3;

  const bg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const cardBg = useColorModeValue("white", "gray.700");
  const cardHoverBg = useColorModeValue("gray.100", "gray.600");
  const cardTextColor = useColorModeValue("gray.800", "gray.200");

  useEffect(() => {
    dispatch(fetchReviews(id));
    setPageNumber(1);
  }, [dispatch, id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
  };

  const paginate = (array, pageSize, pageNumber) => {
    if (!array) return [];
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const paginatedReviews = paginate(movieReviews, pageSize, pageNumber);

  const renderReviews = () => {
    if (status === "loading") {
      return (
        <VStack align="center" mt="20">
          <Spinner size="xl" color="blue.500" />
        </VStack>
      );
    }

    if (status === "failed") {
      return (
        <VStack align="center" mt="20">
          <Text color="red.500">Error: {error}</Text>
        </VStack>
      );
    }

    if (!movieReviews || movieReviews.length === 0) {
      return (
        <VStack align="center" mt="20">
          <Text>No reviews available.</Text>
        </VStack>
      );
    }

    return (
      <VStack align="flex-start" spacing="4" m={2}>
        {paginatedReviews.map((review) => (
          <Box
            key={review.id}
            p="4"
            borderWidth="1px"
            borderRadius="lg"
            bg={cardBg}
            _hover={{ bg: cardHoverBg }}
            boxShadow="md"
            transition="background-color 0.3s">
            <Flex align="center" mb="2" wrap={"wrap"}>
              <Avatar
                name={review.author}
                src={review.author_details.avatar_path}
                mr="2"
              />
              <VStack align="flex-start">
                <Text fontSize="xl" color={cardTextColor}>
                  {review.author}
                </Text>
                {review.author_details.rating && (
                  <Badge colorScheme="green" fontSize="sm">
                    {review.author_details.rating.toFixed(1)}
                  </Badge>
                )}
              </VStack>
            </Flex>
            <Text fontSize="sm" color="gray.500">
              {formatDate(review.created_at)}
            </Text>
            <Text color={cardTextColor}>
              {truncateContent(review.content, 200)}
            </Text>
            <Link
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              color="blue.500">
              Read more
            </Link>
          </Box>
        ))}
      </VStack>
    );
  };

  const handlePrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (movieReviews) {
      setPageNumber((prev) =>
        Math.min(prev + 1, Math.ceil(movieReviews.length / pageSize))
      );
    }
  };

  return (
    <Box
      bg={bg}
      p="4"
      mx="auto"
      mt="2"
      borderRadius="lg"
      boxShadow="xl"
      overflowX="hidden">
      {renderReviews()}
      {movieReviews && movieReviews.length > 0 && (
        <Flex justify="space-between" mt="2" alignItems="center">
          <IconButton
            onClick={handlePrevPage}
            icon={<ChevronLeftIcon />}
            isDisabled={pageNumber === 1}
            aria-label="Previous Page"
            colorScheme="blue"
          />
          <Text color={textColor}>
            Page: {pageNumber} of {Math.ceil(movieReviews.length / pageSize)}
          </Text>
          <IconButton
            onClick={handleNextPage}
            icon={<ChevronRightIcon />}
            isDisabled={
              pageNumber === Math.ceil(movieReviews.length / pageSize)
            }
            aria-label="Next Page"
            colorScheme="blue"
          />
        </Flex>
      )}
    </Box>
  );
};

export default ReviewsMovie;
