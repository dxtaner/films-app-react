import React, { useState } from "react";
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
  HStack,
} from "@chakra-ui/react";

const RuntimeFilter = ({ queryParams, onFilterChange }) => {
  const [runtimeRange, setRuntimeRange] = useState([
    queryParams["with_runtime.gte"] || 0,
    queryParams["with_runtime.lte"] || 360,
  ]);

  const handleSliderChange = (value) => {
    setRuntimeRange(value);
    onFilterChange("with_runtime.gte", value[0]);
    onFilterChange("with_runtime.lte", value[1]);
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
          <FormLabel fontSize="sm" fontWeight="bold" color="gray.200" mb={1}>
            Süre (Dakika)
          </FormLabel>
          <Divider my={2} borderColor="gray.800" />
          <RangeSlider
            min={0}
            max={360}
            step={5}
            value={runtimeRange}
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
            Min: {runtimeRange[0]} dk
          </Text>
          <Text fontWeight="bold" color="red.400" fontSize="sm">
            Max: {runtimeRange[1]} dk
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RuntimeFilter;
