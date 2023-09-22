import React from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";

const MinRatingSlider = ({ queryParams, onFilterChange }) => {
  const handleRatingChange = (value) => {
    onFilterChange("vote_average.gte", value.toFixed(1));
  };

  return (
    <div>
      <Slider
        min={0}
        max={10}
        step={0.1}
        value={parseFloat(queryParams["vote_average.gte"] || 0)}
        onChange={handleRatingChange}
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
        {parseFloat(queryParams["vote_average.gte"] || 0).toFixed(1)}
      </Text>
    </div>
  );
};

export default MinRatingSlider;
