import React from "react";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PopularMoviesCarousel from "../Movies/popularMoviesCarousel.js";
import TopRatedMovies from "../Movies/TopRatedMovies.js";

const Home = () => {
  const navigate = useNavigate();

  const showDetails = (item) => {
    navigate(`/details/${item.id}`, { state: item });
  };

  return (
    <Box>
      <Box mb={8}>
        <PopularMoviesCarousel />
      </Box>

      <TopRatedMovies handleDetails={showDetails} />
    </Box>
  );
};

export default Home;
