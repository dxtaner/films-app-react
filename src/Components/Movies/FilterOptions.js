import React from "react";
import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import OriginCountryFilter from "./FilteredMovies/OriginCountryFilter";
import OriginalLanguageFilter from "./FilteredMovies/OriginalLanguageFilter";
import YearFilter from "./FilteredMovies/YearFilter";
import CastFilter from "./FilteredMovies/CastFilter";
import MinRuntimeFilter from "./FilteredMovies/MinRuntimeFilter";
import MaxRuntimeFilter from "./FilteredMovies/MaxRuntimeFilter";
import MinVoteCountFilter from "./FilteredMovies/MinVoteCountFilter";
import MaxVoteCountFilter from "./FilteredMovies/MaxVoteCountFilter";
import MinRatingSlider from "./FilteredMovies/MinRatingSlider";
import MaxRatingSlider from "./FilteredMovies/MaxRatingSlider";
import RegionFilter from "./FilteredMovies/RegionFilter";
import PrimaryReleaseYearFilter from "./FilteredMovies/PrimaryReleaseYearFilter";
import EndDateFilter from "./FilteredMovies/EndDateFilter";
import StartDateFilter from "./FilteredMovies/StartDateFilter";
import SortByFilter from "./FilteredMovies/SortByFilter";
import CertificationFilter from "./FilteredMovies/CertificationFilter";
import IncludeAdultFilter from "./FilteredMovies/IncludeAdultFilter";
import IncludeVideoFilter from "./FilteredMovies/IncludeVideoFilter";
import GenreFilter from "./FilteredMovies/GenreFilter";
import WithoutFilterGenreFilter from "./FilteredMovies/WithoutGenreFilter";

const FilterOptions = ({ queryParams, onFilterChange }) => {
  return (
    <Box>
      <Text fontSize="md" fontWeight="bold" mb={10}>
        Filtre Seçenekleri
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Sırala
          </Text>
          <SortByFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Sertifika
          </Text>
          <CertificationFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Yetişkin İçerik
          </Text>
          <IncludeAdultFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Video İçerik
          </Text>
          <IncludeVideoFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Türler:
          </Text>
          <GenreFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Türü Hariç Tut
          </Text>
          <WithoutFilterGenreFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <StartDateFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <EndDateFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Yayın Yılı
          </Text>
          <PrimaryReleaseYearFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Bölge
          </Text>
          <RegionFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Oylama Ort. (Min)
          </Text>
          <MinRatingSlider
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Oylama Ort. (Max)
          </Text>
          <MaxRatingSlider
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <MinVoteCountFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <MaxVoteCountFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Min DK
          </Text>
          <MinRuntimeFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Max DK
          </Text>
          <MaxRuntimeFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Oyuncular
          </Text>
          <CastFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Yıl
          </Text>
          <YearFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Ülke
          </Text>
          <OriginCountryFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Dil
          </Text>
          <OriginalLanguageFilter
            queryParams={queryParams}
            onFilterChange={onFilterChange}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default FilterOptions;
