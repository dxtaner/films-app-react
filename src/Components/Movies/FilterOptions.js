import React from "react";
import {
  Box,
  Text,
  Select,
  Input,
  Grid,
  GridItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import genreOptions from "./genreOptions";
import { FaLanguage } from "react-icons/fa";
import OriginCountryFilter from "./OriginCountryFilter";
import OriginalLanguageFilter from "./OriginalLanguageFilter";

const FilterOptions = ({ queryParams, onFilterChange }) => {
  const renderSelectOptions = (options) => {
    return options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ));
  };

  const handleRatingChange = (value) => {
    onFilterChange("vote_average.gte", value.toString());
  };

  const handleMaxRatingChange = (value) => {
    onFilterChange("vote_average.lte", value.toString());
  };
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
          <Select
            value={queryParams.sort_by}
            onChange={(e) => onFilterChange("sort_by", e.target.value)}
            size="xs"
            borderWidth="2px"
            borderRadius="md"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.400", boxShadow: "none" }}
            _hover={{ borderColor: "gray.400" }}
            maxWidth="200px">
            {renderSelectOptions([
              { id: "popularity.desc", name: "Popülerlik (Azalan)" },
              { id: "popularity.asc", name: "Popülerlik (Artan)" },
              { id: "revenue.desc", name: "Gelir (Azalan)" },
              { id: "revenue.asc", name: "Gelir (Artan)" },
              {
                id: "primary_release_date.desc",
                name: "İlk Yayın Tarihi (Azalan)",
              },
              {
                id: "primary_release_date.asc",
                name: "İlk Yayın Tarihi (Artan)",
              },
              { id: "vote_average.desc", name: "Oylama Ortalaması (Azalan)" },
              { id: "vote_average.asc", name: "Oylama Ortalaması (Artan)" },
              { id: "vote_count.desc", name: "Oy Sayısı (Azalan)" },
              { id: "vote_count.asc", name: "Oy Sayısı (Artan)" },
            ])}
          </Select>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Sertifika
          </Text>
          <Select
            value={queryParams.certification}
            onChange={(e) => onFilterChange("certification", e.target.value)}
            size="xs" // Ekstra küçük boyutta seçim kutusu
            borderWidth="1px" // İnce kenarlık
            borderRadius="sm" // Hafif yuvarlak kenarlar
            borderColor="gray.300" // Kenarlık rengi
            _focus={{ borderColor: "blue.400", boxShadow: "none" }} // Odaklandığında stillendirme
            maxWidth="100px" // Maksimum genişlik
          >
            {renderSelectOptions([
              { id: "PG-13", name: "PG-13" },
              { id: "R", name: "R" },
            ])}
          </Select>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Yetişkin İçerik
          </Text>
          <Select
            value={queryParams.include_adult.toString()}
            onChange={(e) =>
              onFilterChange("include_adult", e.target.value === "true")
            }
            size="xs" // Ekstra küçük boyutta seçim kutusu
            borderWidth="1px" // İnce kenarlık
            borderRadius="sm" // Hafif yuvarlak kenarlar
            borderColor="gray.300" // Kenarlık rengi
            _focus={{ borderColor: "blue.400", boxShadow: "none" }} // Odaklandığında stillendirme
            maxWidth="100px" // Maksimum genişlik
          >
            {renderSelectOptions([
              { id: "true", name: "Evet" },
              { id: "false", name: "Hayır" },
            ])}
          </Select>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Video İçerik
          </Text>
          <Select
            value={queryParams.include_video.toString()}
            onChange={(e) =>
              onFilterChange("include_video", e.target.value === "true")
            }
            size="xs" // Ekstra küçük boyutta seçim kutusu
            borderWidth="1px" // İnce kenarlık
            borderRadius="sm" // Hafif yuvarlak kenarlar
            borderColor="gray.300" // Kenarlık rengi
            _focus={{ borderColor: "blue.400", boxShadow: "none" }} // Odaklandığında stillendirme
            maxWidth="100px" // Maksimum genişlik
          >
            {renderSelectOptions([
              { id: "true", name: "Evet" },
              { id: "false", name: "Hayır" },
            ])}
          </Select>
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Tür 1
          </Text>
          <Select
            value={queryParams.with_genres || ""}
            onChange={(e) => onFilterChange("with_genres", e.target.value)}
            size="xs" // Küçük boyutta seçim kutusu
            borderWidth="1px" // İnce kenarlık
            borderRadius="sm" // Hafif yuvarlak kenarlar
            borderColor="gray.300" // Kenarlık rengi
            _focus={{ borderColor: "blue.400", boxShadow: "none" }} // Odaklandığında stillendirme
            maxWidth="200px" // Maksimum genişlik
          >
            <option value="">Tüm Türler</option>
            {renderSelectOptions(genreOptions)}
          </Select>
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Hariç Tür
          </Text>
          <Select
            value={queryParams.without_genres || ""}
            onChange={(e) => onFilterChange("without_genres", e.target.value)}
            size="xs" // Ekstra küçük boyutta seçim kutusu
            borderWidth="1px" // İnce kenarlık
            borderRadius="sm" // Hafif yuvarlak kenarlar
            borderColor="gray.300" // Kenarlık rengi
            _focus={{ borderColor: "blue.400", boxShadow: "none" }} // Odaklandığında stillendirme
            maxWidth="100px" // Maksimum genişlik
          >
            <option value="">Seçmeme</option>
            {renderSelectOptions(genreOptions)}
          </Select>
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Yayın Tarihi (Başlangıç)
          </Text>
          <Input
            type="date"
            value={queryParams.primary_release_date.gte || ""}
            onChange={(e) =>
              onFilterChange("primary_release_date.gte", e.target.value)
            }
            size="xs" // Küçük boyutta giriş alanı
            borderWidth="1px" // İnce kenarlık
            borderRadius="sm" // Hafif yuvarlak kenarlar
            borderColor="gray.300" // Kenarlık rengi
            _focus={{ borderColor: "blue.400", boxShadow: "none" }} // Odaklandığında stillendirme
            maxWidth="100px" // Maksimum genişlik
          />
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Yayın Tarihi (Bitiş)
          </Text>
          <Input
            type="date"
            value={queryParams.primary_release_date.lte || ""}
            onChange={(e) =>
              onFilterChange("primary_release_date.lte", e.target.value)
            }
            size="xs" // Ekstra küçük boyutta giriş alanı
            borderWidth="1px" // İnce kenarlık
            borderRadius="sm" // Hafif yuvarlak kenarlar
            borderColor="gray.300" // Kenarlık rengi
            _focus={{ borderColor: "blue.400", boxShadow: "none" }} // Odaklandığında stillendirme
            maxWidth="100px" // Maksimum genişlik
          />
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Yayın Yılı
          </Text>
          <Input
            type="number"
            value={queryParams.primary_release_year || ""}
            onChange={(e) =>
              onFilterChange("primary_release_year", e.target.value)
            }
            size="xs" // Küçük boyutta giriş alanı
            borderWidth="1px" // İnce kenarlık
            borderRadius="sm" // Hafif yuvarlak kenarlar
            borderColor="gray.300" // Kenarlık rengi
            _focus={{ borderColor: "blue.400", boxShadow: "none" }} // Odaklandığında stillendirme
            maxWidth="100px" // Maksimum genişlik
          />
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Bölge
          </Text>
          <Input
            type="text"
            value={queryParams.region || ""}
            onChange={(e) => onFilterChange("region", e.target.value)}
            size="xs" // Küçük boyutta giriş alanı
            borderWidth="1px" // İnce kenarlık
            borderRadius="sm" // Hafif yuvarlak kenarlar
            borderColor="gray.300" // Kenarlık rengi
            _focus={{ borderColor: "blue.400", boxShadow: "none" }} // Odaklandığında stillendirme
            maxWidth="150px" // Maksimum genişlik
          />
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Oylama Ortalaması (Minimum )
          </Text>
          <Slider
            min={0}
            max={10}
            step={0.1}
            value={parseFloat(queryParams["vote_average.gte"] || 0)}
            onChange={handleRatingChange}
            size="xs" // Küçük boyut
            colorScheme="blue" // Renk şeması
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={4} bg="blue.400" />
          </Slider>
          <Text mt={2} fontSize="xs" textAlign="center">
            Seçilen Değer:{" "}
            {parseFloat(queryParams["vote_average.gte"] || 0).toFixed(1)}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Oylama Ortalaması (Maksimum)
          </Text>
          <Slider
            min={0}
            max={10}
            step={0.1}
            value={parseFloat(queryParams["vote_average.lte"] || 10)}
            onChange={handleMaxRatingChange}
            size="xs" // Küçük boyut
            colorScheme="blue" // Renk şeması
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={4} bg="blue.400" />
          </Slider>
          <Text mt={2} fontSize="xs" textAlign="center">
            Seçilen Değer:{" "}
            {parseFloat(queryParams["vote_average.lte"] || 10).toFixed(1)}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Oy Sayısı (Minimum)
          </Text>
          <Input
            type="number"
            value={queryParams["vote_count.gte"] || ""}
            onChange={(e) => onFilterChange("vote_count.gte", e.target.value)}
          />
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Oy Sayısı (Maksimum)
          </Text>
          <Input
            type="number"
            value={queryParams["vote_count.lte"] || ""}
            onChange={(e) => onFilterChange("vote_count.lte", e.target.value)}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Süre (Dakika) (Minimum)
          </Text>
          <Input
            type="number"
            value={queryParams["with_runtime.gte"] || ""}
            onChange={(e) => onFilterChange("with_runtime.gte", e.target.value)}
          />
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Süre (Dakika) (Maksimum)
          </Text>
          <Input
            type="number"
            value={queryParams["with_runtime.lte"] || ""}
            onChange={(e) => onFilterChange("with_runtime.lte", e.target.value)}
          />
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Oyuncular (virgülle ayrılmış)
          </Text>
          <Input
            type="text"
            value={queryParams.with_cast || ""}
            onChange={(e) => onFilterChange("with_cast", e.target.value)}
          />
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            Yıl
          </Text>
          <Input
            type="number"
            value={queryParams.year || ""}
            onChange={(e) => onFilterChange("year", e.target.value)}
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
