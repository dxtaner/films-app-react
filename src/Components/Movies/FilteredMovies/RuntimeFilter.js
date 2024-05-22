import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";

const RuntimeFilter = ({ queryParams, onFilterChange }) => {
  const [runtimeRange, setRuntimeRange] = useState([
    queryParams["with_runtime.gte"] || 0,
    queryParams["with_runtime.lte"] || 360,
  ]);

  useEffect(() => {
    onFilterChange({
      "with_runtime.gte": runtimeRange[0],
      "with_runtime.lte": runtimeRange[1],
    });
  }, [runtimeRange, onFilterChange]);

  const handleSliderChange = (value) => {
    setRuntimeRange(value);
    onFilterChange("with_runtime.gte", value[0]);
    onFilterChange("with_runtime.lte", value[1]);
  };

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      borderColor="gray.200"
      _hover={{ boxShadow: "lg", borderColor: "gray.300" }}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel fontSize="md" fontWeight="bold" color="teal.600">
            Süre (Dakika)
          </FormLabel>
          <Divider my={2} borderColor="teal.500" />
          <RangeSlider
            min={0}
            max={300}
            step={1}
            value={runtimeRange}
            onChange={handleSliderChange}
            colorScheme="teal">
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={6} index={0}>
              <Box color="teal.400" />
            </RangeSliderThumb>
            <RangeSliderThumb boxSize={6} index={1}>
              <Box color="teal.400" />
            </RangeSliderThumb>
          </RangeSlider>
          <Text mt={2} fontWeight="bold" color="teal.600">
            Min: {runtimeRange[0]} dakika
          </Text>
          <Text fontWeight="bold" color="teal.600">
            Max: {runtimeRange[1]} dakika
          </Text>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default RuntimeFilter;
