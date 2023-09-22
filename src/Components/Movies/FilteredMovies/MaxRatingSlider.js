import React from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";

const MaxRatingSlider = ({ queryParams, onFilterChange }) => {
  const handleMaxRatingChange = (value) => {
    onFilterChange("vote_average.lte", value.toFixed(1));
  };

  return (
    <div>
      <Slider
        min={0}
        max={10}
        step={0.1}
        value={parseFloat(queryParams["vote_average.lte"] || 10)}
        onChange={handleMaxRatingChange}
        size="xs"
        colorScheme="blue"
        maxWidth="150px">
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={4} bg="blue.400" />
      </Slider>
      <Text mt={2} fontSize="xs" textAlign="center" maxWidth="100px">
        Seçilen Değer:{" "}
        {parseFloat(queryParams["vote_average.lte"] || 10).toFixed(1)}
      </Text>
    </div>
  );
};

export default MaxRatingSlider;
