import React from "react";
import { Box, Text, Select, Input, Divider } from "@chakra-ui/react";
import genreOptions from "./genreOptions";

const FilterOptions = ({ queryParams, onFilterChange }) => {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={10}>
        Filtre Seçenekleri
      </Text>
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Sırala
        </Text>
        <Select
          value={queryParams.sort_by}
          onChange={(e) => onFilterChange("sort_by", e.target.value)}>
          <option value="popularity.desc">Popülerlik (Azalan)</option>
          <option value="popularity.asc">Popülerlik (Artan)</option>
          <option value="revenue.desc">Gelir (Azalan)</option>
          <option value="revenue.asc">Gelir (Artan)</option>
          <option value="primary_release_date.desc">
            İlk Yayın Tarihi (Azalan)
          </option>
          <option value="primary_release_date.asc">
            İlk Yayın Tarihi (Artan)
          </option>
          <option value="vote_average.desc">Oylama Ortalaması (Azalan)</option>
          <option value="vote_average.asc">Oylama Ortalaması (Artan)</option>
          <option value="vote_count.desc">Oy Sayısı (Azalan)</option>
          <option value="vote_count.asc">Oy Sayısı (Artan)</option>
        </Select>
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Sertifika
        </Text>
        <Select
          value={queryParams.certification}
          onChange={(e) => onFilterChange("certification", e.target.value)}>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
        </Select>
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Yetişkin İçerik
        </Text>
        <Select
          value={queryParams.include_adult.toString()}
          onChange={(e) =>
            onFilterChange("include_adult", e.target.value === "true")
          }>
          <option value="true">Evet</option>
          <option value="false">Hayır</option>
        </Select>
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Video İçerik
        </Text>
        <Select
          value={queryParams.include_video.toString()}
          onChange={(e) =>
            onFilterChange("include_video", e.target.value === "true")
          }>
          <option value="true">Evet</option>
          <option value="false">Hayır</option>
        </Select>
      </Box>

      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Tür 1
        </Text>
        <Select
          value={queryParams.with_genres || ""}
          onChange={(e) => onFilterChange("with_genres", e.target.value)}>
          <option value="">Tüm Türler</option>
          {genreOptions.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Select>
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Tür 2
        </Text>
        <Select
          value={queryParams.with_genres || ""}
          onChange={(e) => onFilterChange("with_genres", e.target.value)}>
          <option value="">Tüm Türler</option>
          {genreOptions.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Select>
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Türleri Hariç Tut
        </Text>
        <Select
          value={queryParams.without_genres || ""}
          onChange={(e) => onFilterChange("without_genres", e.target.value)}>
          <option value="">Seçmeme</option>
          {genreOptions.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Select>
      </Box>
      <Divider />

      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Yıl
        </Text>
        <Input
          type="number"
          value={queryParams.primary_release_year || ""}
          onChange={(e) =>
            onFilterChange("primary_release_year", e.target.value)
          }
        />
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Yayın Tarihi (Başlangıç)
        </Text>
        <Input
          type="date"
          value={queryParams.primary_release_date.gte || ""}
          onChange={(e) =>
            onFilterChange("primary_release_date.gte", e.target.value)
          }
        />
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Yayın Tarihi (Bitiş)
        </Text>
        <Input
          type="date"
          value={queryParams.primary_release_date.lte || ""}
          onChange={(e) =>
            onFilterChange("primary_release_date.lte", e.target.value)
          }
        />
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Bölge
        </Text>
        <Input
          type="text"
          value={queryParams.region || ""}
          onChange={(e) => onFilterChange("region", e.target.value)}
        />
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Oylama Ortalaması (Minimum)
        </Text>
        <Input
          type="number"
          value={queryParams["vote_average.gte"] || ""}
          onChange={(e) => onFilterChange("vote_average.gte", e.target.value)}
        />
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Oylama Ortalaması (Maksimum)
        </Text>
        <Input
          type="number"
          value={queryParams["vote_average.lte"] || ""}
          onChange={(e) => onFilterChange("vote_average.lte", e.target.value)}
        />
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Oy Sayısı (Minimum)
        </Text>
        <Input
          type="number"
          value={queryParams["vote_count.gte"] || ""}
          onChange={(e) => onFilterChange("vote_count.gte", e.target.value)}
        />
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Oy Sayısı (Maksimum)
        </Text>
        <Input
          type="number"
          value={queryParams["vote_count.lte"] || ""}
          onChange={(e) => onFilterChange("vote_count.lte", e.target.value)}
        />
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Oyuncular (virgülle ayrılmış)
        </Text>
        <Input
          type="text"
          value={queryParams.with_cast || ""}
          onChange={(e) => onFilterChange("with_cast", e.target.value)}
        />
      </Box>
      <Divider />

      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Süre (Dakika) (Minimum)
        </Text>
        <Input
          type="number"
          value={queryParams["with_runtime.gte"] || ""}
          onChange={(e) => onFilterChange("with_runtime.gte", e.target.value)}
        />
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Süre (Dakika) (Maksimum)
        </Text>
        <Input
          type="number"
          value={queryParams["with_runtime.lte"] || ""}
          onChange={(e) => onFilterChange("with_runtime.lte", e.target.value)}
        />
      </Box>
      <Divider />

      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Yıl
        </Text>
        <Input
          type="number"
          value={queryParams.year || ""}
          onChange={(e) => onFilterChange("year", e.target.value)}
        />
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Ülke
        </Text>
        <Input
          type="text"
          value={queryParams.with_origin_country || ""}
          onChange={(e) =>
            onFilterChange("with_origin_country", e.target.value)
          }
        />
      </Box>
      <Divider />
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Dil
        </Text>
        <Input
          type="text"
          value={queryParams.with_original_language || ""}
          onChange={(e) =>
            onFilterChange("with_original_language", e.target.value)
          }
        />
      </Box>
      <Divider />
    </Box>
  );
};

export default FilterOptions;
