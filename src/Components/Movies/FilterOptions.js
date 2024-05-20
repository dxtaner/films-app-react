import React from "react";
import { Grid, Box, Text, Divider, Stack } from "@chakra-ui/react";
import SortByFilter from "./FilteredMovies/SortByFilter";
import CertificationFilter from "./FilteredMovies/CertificationFilter";
import IncludeAdultFilter from "./FilteredMovies/IncludeAdultFilter";
import IncludeVideoFilter from "./FilteredMovies/IncludeVideoFilter";
import StartDateFilter from "./FilteredMovies/StartDateFilter";
import EndDateFilter from "./FilteredMovies/EndDateFilter";
import PrimaryReleaseYearFilter from "./FilteredMovies/PrimaryReleaseYearFilter";
import GenreFilter from "./FilteredMovies/GenreFilter";
import WithoutFilterGenreFilter from "./FilteredMovies/WithoutGenreFilter";
import OriginCountryFilter from "./FilteredMovies/OriginCountryFilter";
import OriginalLanguageFilter from "./FilteredMovies/OriginalLanguageFilter";
import RuntimeFilter from "./FilteredMovies/RuntimeFilter";
import VoteCountRangeFilter from "./FilteredMovies/VoteCountRangeFilter";
import RatingRangeFilter from "./FilteredMovies/RatingRangeFilter";

const FilterOptions = ({ queryParams, onFilterChange }) => {
  return (
    <Box mt={4}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Sırala
          </Text>
          <Divider my={2} borderColor="teal.500" />

          <SortByFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
          <Divider my={2} borderColor="teal.500" />
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Sertifika
          </Text>
          <Divider my={2} borderColor="teal.500" />

          <CertificationFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
          <Divider my={2} borderColor="teal.500" />
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Yetişkin İçerik
          </Text>
          <Divider my={2} borderColor="teal.500" />

          <IncludeAdultFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
          <Divider my={2} borderColor="teal.500" />
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Video İçerik
          </Text>
          <Divider my={2} borderColor="teal.500" />

          <IncludeVideoFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
          <Divider my={2} borderColor="teal.500" />
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Tarih Filtreleri
          </Text>
          <Divider my={2} borderColor="teal.500" />

          <Stack spacing={2}>
            <StartDateFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
            <Divider my={2} borderColor="teal.500" />
            <EndDateFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
            <Divider my={2} borderColor="teal.500" />
            <PrimaryReleaseYearFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
            <Divider my={2} borderColor="teal.500" />
          </Stack>
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Oylama Filtreleri
          </Text>
          <Divider my={2} borderColor="teal.500" />

          <Stack spacing={2}>
            <RatingRangeFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
            <Divider my={2} borderColor="teal.500" />

            <VoteCountRangeFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
            <Divider my={2} borderColor="teal.500" />
          </Stack>
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Tür Filtreleri
          </Text>
          <Divider my={2} borderColor="teal.500" />

          <GenreFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
          <Divider my={2} borderColor="teal.500" />

          <WithoutFilterGenreFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
          <Divider my={2} borderColor="teal.500" />
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Film Ülke Filtreleri
          </Text>
          <Divider my={2} borderColor="teal.500" />
          <Stack spacing={2}>
            <OriginCountryFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
            <Divider my={2} borderColor="teal.500" />

            <OriginalLanguageFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
            <Divider my={2} borderColor="teal.500" />
          </Stack>
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Film Süresi Filtreleri
          </Text>
          <Divider my={2} borderColor="teal.500" />

          <RuntimeFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
          <Divider my={2} borderColor="teal.500" />
        </Box>
      </Grid>
    </Box>
  );
};

export default FilterOptions;
