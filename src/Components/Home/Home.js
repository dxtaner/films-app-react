import { Box, VStack, Text, StackDivider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PopularMovies from "../Movies/popular.js";
import TopRatedMovies from "../Movies/top.js";
import Title from "../Title/titles.js";

const Home = () => {
  const navigate = useNavigate();

  const showDetails = (item) => {
    navigate(`/details/${item.id}`, { state: item });
  };

  return (
    <>
      <Box>
        <PopularMovies />
      </Box>

      <VStack
        divider={<StackDivider borderColor="red.600" />}
        spacing={4}
        p={[2, 4, 6, 8]}>
        <Box>
          <Title text="En Çok Puan Alan Filmler">
            <Text>Şimdiki zamana kadarki en değerli filmler</Text>
          </Title>
        </Box>
        <Box>
          <TopRatedMovies handleDetails={showDetails} />
        </Box>
      </VStack>
    </>
  );
};
export default Home;
