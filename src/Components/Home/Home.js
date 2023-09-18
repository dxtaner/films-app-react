import { Box, VStack, Text, StackDivider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PopularMoviesCarousel from "../Movies/popularMoviesCarousel.js";
import TopRatedMovies from "../Movies/TopRatedMovies.js";
import Title from "../Title/titles.js";

const Home = () => {
  const navigate = useNavigate();

  const showDetails = (item) => {
    navigate(`/details/${item.id}`, { state: item });
  };

  return (
    <>
      <Box>
        <PopularMoviesCarousel />
      </Box>

      <VStack
        spacing={5}
        p={4}
        divider={<StackDivider borderColor="blue.800" />}
        alignItems="stretch" // İçerikleri yatay olarak genişletir
      >
        <Title text="En Çok Puan Alan Filmler">
          <Text>Şimdiki zamana kadarki en değerli filmler</Text>
        </Title>
        <TopRatedMovies handleDetails={showDetails} />
      </VStack>
    </>
  );
};
export default Home;
