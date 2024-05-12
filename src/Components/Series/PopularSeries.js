import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularSeries } from "../../app/features/series/popularSeriesSlice";
import { Box, Center, Heading, Spinner, Text, Wrap } from "@chakra-ui/react";
import SeriesCardDetail from "../Cards/SeriesCardDetail";

const PopularSeries = () => {
  const dispatch = useDispatch();
  const seriesPopular = useSelector((state) => state.popularSeries.series);
  const status = useSelector((state) => state.popularSeries.status);
  const error = useSelector((state) => state.popularSeries.error);

  useEffect(() => {
    dispatch(fetchPopularSeries());
  }, [dispatch]);

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        Popüler Diziler
      </Heading>
      <Box borderBottom="1px solid #ccc" mb={4} />
      {status === "loading" && (
        <Center>
          <Spinner size="xl" />
        </Center>
      )}
      {status === "failed" && (
        <Text fontSize="lg" textAlign="center" color="red.500">
          Hata: {error}
        </Text>
      )}
      {status === "succeeded" && (
        <Wrap spacing={4} justify="center">
          {seriesPopular.length > 0 ? (
            seriesPopular.map((series) => (
              <SeriesCardDetail key={series.id} series={series} />
            ))
          ) : (
            <Text fontSize="lg" textAlign="center">
              Hiç veri bulunamadı.
            </Text>
          )}
        </Wrap>
      )}
    </Box>
  );
};

export default PopularSeries;
