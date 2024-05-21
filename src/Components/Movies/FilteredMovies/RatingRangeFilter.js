import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Text,
  VStack,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Divider,
  HStack,
} from "@chakra-ui/react";

const RatingRangeFilter = ({ queryParams, onFilterChange }) => {
  const [ratingRange, setRatingRange] = useState([
    parseFloat(queryParams["vote_average.gte"]) || 0,
    parseFloat(queryParams["vote_average.lte"]) || 10,
  ]);

  const handleSliderChange = (value) => {
    setRatingRange(value);
    onFilterChange("vote_average.gte", value[0].toFixed(1));
    onFilterChange("vote_average.lte", value[1].toFixed(1));
  };

  useEffect(() => {
    onFilterChange("vote_average.lte", ratingRange[1]);
    onFilterChange("vote_average.gte", ratingRange[0]);
  }, [ratingRange, onFilterChange]);

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="sm"
      bg="gray.50"
      borderColor="gray.200"
      _hover={{ boxShadow: "md", borderColor: "gray.300" }}>
      <VStack spacing={4} align="start">
        <FormControl>
          <FormLabel fontWeight="bold" mb={2} color="teal.600">
            Kullanıcı Puanı Aralığı
          </FormLabel>
          <Divider my={2} borderColor="teal.500" />
          <RangeSlider
            min={0}
            max={10}
            step={0.2}
            value={ratingRange}
            onChange={handleSliderChange}
            colorScheme="teal"
            mt={4}>
            <RangeSliderTrack bg="teal.100">
              <RangeSliderFilledTrack bg="teal.500" />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={6} index={0}>
              <Box color="teal.600" />
            </RangeSliderThumb>
            <RangeSliderThumb boxSize={6} index={1}>
              <Box color="teal.600" />
            </RangeSliderThumb>
          </RangeSlider>
        </FormControl>
        <HStack justifyContent="space-between" width="100%" pt={2}>
          <Text fontWeight="bold" color="teal.600">
            Min: {ratingRange[0]}
          </Text>
          <Text fontWeight="bold" color="teal.600">
            Max: {ratingRange[1]}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RatingRangeFilter;
