import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularSeries } from "../../app/features/series/popularSeriesSlice.js"; // Redux action'ını içe aktarın
import { Box, Heading, Text, Wrap } from "@chakra-ui/react";
import SeriesCardDetail from "../Cards/SeriesCardDetail.js"; // SeriesCard bileşenini içe aktarın

const PopularSeries = () => {
  const dispatch = useDispatch();
  const seriesPopular = useSelector((state) => state.popularSeries.series); // Redux store'dan veriyi seçin

  useEffect(() => {
    dispatch(fetchPopularSeries()); // Redux thunk'ını çağırın
  }, [dispatch]);

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={4}>
        Popüler Diziler
      </Heading>
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
