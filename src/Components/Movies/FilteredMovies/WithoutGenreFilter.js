import React from "react";
import { Select } from "@chakra-ui/react";
import genreOptions from "../genreOptions";

const WithoutGenreFilter = ({ queryParams, onFilterChange }) => {
  return (
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
      {genreOptions.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </Select>
  );
};

export default WithoutGenreFilter;
