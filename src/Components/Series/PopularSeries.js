import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularSeries } from "../../app/features/series/popularSeriesSlice.js";
import { Box, Heading, Text, Wrap } from "@chakra-ui/react";
import SeriesCardDetail from "../Cards/SeriesCardDetail.js";

const PopularSeries = () => {
  const dispatch = useDispatch();
  const seriesPopular = useSelector((state) => state.popularSeries.series);

  useEffect(() => {
    dispatch(fetchPopularSeries());
  }, [dispatch]);

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        Popüler Diziler
      </Heading>
      <Box borderBottom="1px solid #ccc" mb={4} />
      {seriesPopular.length > 0 ? (
        <Wrap spacing={4} justify="center">
          {seriesPopular.map((series) => (
            <SeriesCardDetail key={series.id} series={series} />
          ))}
        </Wrap>
      ) : (
        <Text fontSize="lg">Hiç veri bulunamadı.</Text>
      )}
    </Box>
  );
};

export default PopularSeries;
