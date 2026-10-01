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
    <Box mt={2}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        <Box
          bg="gray.900"
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.800"
        >
          <Text fontSize="md" fontWeight="bold" color="red.400">
            Sırala
          </Text>
          <Divider my={3} borderColor="gray.800" />
          <SortByFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </Box>

        <Box
          bg="gray.900"
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.800"
        >
          <Text fontSize="md" fontWeight="bold" color="red.400">
            Sertifika
          </Text>
          <Divider my={3} borderColor="gray.800" />
          <CertificationFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </Box>

        <Box
          bg="gray.900"
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.800"
        >
          <Text fontSize="md" fontWeight="bold" color="red.400">
            Yetişkin İçerik
          </Text>
          <Divider my={3} borderColor="gray.800" />
          <IncludeAdultFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </Box>

        <Box
          bg="gray.900"
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.800"
        >
          <Text fontSize="md" fontWeight="bold" color="red.400">
            Video İçerik
          </Text>
          <Divider my={3} borderColor="gray.800" />
          <IncludeVideoFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </Box>

        <Box
          bg="gray.900"
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.800"
        >
          <Text fontSize="md" fontWeight="bold" color="red.400">
            Tarih Filtreleri
          </Text>
          <Divider my={3} borderColor="gray.800" />
          <Stack spacing={3}>
            <StartDateFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
            <EndDateFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
            <PrimaryReleaseYearFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
          </Stack>
        </Box>

        <Box
          bg="gray.900"
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.800"
        >
          <Text fontSize="md" fontWeight="bold" color="red.400">
            Oylama Filtreleri
          </Text>
          <Divider my={3} borderColor="gray.800" />
          <Stack spacing={3}>
            <RatingRangeFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
            <VoteCountRangeFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
          </Stack>
        </Box>

        <Box
          bg="gray.900"
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.800"
        >
          <Text fontSize="md" fontWeight="bold" color="red.400">
            Tür Filtreleri
          </Text>
          <Divider my={3} borderColor="gray.800" />
          <Stack spacing={3}>
            <GenreFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
            <WithoutFilterGenreFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
          </Stack>
        </Box>

        <Box
          bg="gray.900"
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.800"
        >
          <Text fontSize="md" fontWeight="bold" color="red.400">
            Film Ülke / Dil Filtreleri
          </Text>
          <Divider my={3} borderColor="gray.800" />
          <Stack spacing={3}>
            <OriginCountryFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
            <OriginalLanguageFilter
              queryParams={queryParams}
              onFilterChange={onFilterChange}
            />
          </Stack>
        </Box>

        <Box
          bg="gray.900"
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.800"
        >
          <Text fontSize="md" fontWeight="bold" color="red.400">
            Film Süresi Filtreleri
          </Text>
          <Divider my={3} borderColor="gray.800" />
          <RuntimeFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default FilterOptions;
