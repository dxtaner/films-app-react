import React, { useState } from "react";
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

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="xl"
      bg="gray.900"
      borderColor="gray.800"
      boxShadow="lg"
      _hover={{ borderColor: "gray.700" }}
    >
      <VStack spacing={3} align="start">
        <FormControl>
          <FormLabel fontWeight="bold" mb={1} color="gray.200" fontSize="sm">
            Kullanıcı Puanı Aralığı
          </FormLabel>
          <Divider my={2} borderColor="gray.800" />
          <RangeSlider
            min={0}
            max={10}
            step={0.2}
            value={ratingRange}
            onChange={handleSliderChange}
            mt={4}
          >
            <RangeSliderTrack bg="gray.800">
              <RangeSliderFilledTrack bg="red.600" />
            </RangeSliderTrack>
            <RangeSliderThumb
              boxSize={5}
              index={0}
              bg="white"
              borderColor="red.600"
              borderWidth={2}
            />
            <RangeSliderThumb
              boxSize={5}
              index={1}
              bg="white"
              borderColor="red.600"
              borderWidth={2}
            />
          </RangeSlider>
        </FormControl>
        <HStack justifyContent="space-between" width="100%" pt={2}>
          <Text fontWeight="bold" color="red.400" fontSize="sm">
            Min: {ratingRange[0]}
          </Text>
          <Text fontWeight="bold" color="red.400" fontSize="sm">
            Max: {ratingRange[1]}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RatingRangeFilter;
