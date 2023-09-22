import React from "react";
import { Input } from "@chakra-ui/react";

const PrimaryReleaseYearFilter = ({ queryParams, onFilterChange }) => {
  const handleYearChange = (e) => {
    const year = e.target.value;
    onFilterChange("primary_release_year", year);
  };

  return (
    <Input
      type="number"
      value={queryParams.primary_release_year || ""}
      onChange={handleYearChange}
      size="xs" // Küçük boyutta giriş alanı
      borderWidth="1px" // İnce kenarlık
      borderRadius="sm" // Hafif yuvarlak kenarlar
      borderColor="gray.300" // Kenarlık rengi
      _focus={{ borderColor: "blue.400", boxShadow: "none" }} // Odaklandığında stillendirme
      maxWidth="150px" // Maksimum genişlik
      placeholder="Yıl"
    />
  );
};

export default PrimaryReleaseYearFilter;
