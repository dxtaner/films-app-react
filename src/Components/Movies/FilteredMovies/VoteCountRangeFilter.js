import React, { useState } from "react";
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
  HStack,
} from "@chakra-ui/react";

const MinVoteCountFilter = ({ queryParams, onFilterChange }) => {
  const [minVoteCount, setMinVoteCount] = useState(
    parseInt(queryParams["vote_count.gte"]) || 0,
  );

  const handleSliderChange = (value) => {
    setMinVoteCount(value);
    onFilterChange("vote_count.gte", value);
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
      <FormControl>
        <FormLabel fontSize="sm" fontWeight="bold" color="gray.200" mb={1}>
          Minimum Kullanıcı Oyları
        </FormLabel>
        <Divider my={2} borderColor="gray.800" />
        <Slider
          min={0}
          max={1000}
          step={10}
          value={minVoteCount}
          onChange={handleSliderChange}
          mt={4}
        >
          <SliderTrack bg="gray.800">
            <SliderFilledTrack bg="red.600" />
          </SliderTrack>
          <SliderThumb
            boxSize={5}
            bg="white"
            borderColor="red.600"
            borderWidth={2}
          />
        </Slider>
        <HStack justify="space-between" mt={2}>
          <Text fontSize="xs" color="gray.400">
            0
          </Text>
          <Text fontWeight="bold" color="red.400" fontSize="sm">
            Min: {minVoteCount} Oy
          </Text>
          <Text fontSize="xs" color="gray.400">
            1000+
          </Text>
        </HStack>
      </FormControl>
    </Box>
  );
};

export default MinVoteCountFilter;
