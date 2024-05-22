import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Divider,
} from "@chakra-ui/react";

const MinVoteCountFilter = ({ queryParams, onFilterChange }) => {
  const [minVoteCount, setMinVoteCount] = useState(
    parseInt(queryParams["vote_count.gte"]) || 0
  );

  const handleSliderChange = (value) => {
    setMinVoteCount(value);
    onFilterChange("vote_count.gte", value);
  };

  useEffect(() => {
    onFilterChange("vote_count.gte", minVoteCount);
  }, [minVoteCount, onFilterChange]);

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="sm"
      bg="gray.50"
      borderColor="gray.200"
      _hover={{ boxShadow: "md", borderColor: "gray.300" }}>
      <FormControl>
        <FormLabel fontWeight="bold" color="teal.600">
          Minimum Kullanıcı Oyları
        </FormLabel>
        <Divider my={2} borderColor="teal.500" />
        <Slider
          min={0}
          max={1000}
          step={5}
          value={minVoteCount}
          onChange={handleSliderChange}
          colorScheme="teal"
          mt={4}>
          <SliderTrack bg="teal.100">
            <SliderFilledTrack bg="teal.500" />
          </SliderTrack>
          <SliderThumb boxSize={6} color="teal.600" />
        </Slider>
        <Text mt={2} fontWeight="bold" color="teal.600">
          Min: {minVoteCount}
        </Text>
      </FormControl>
    </Box>
  );
};

export default MinVoteCountFilter;
