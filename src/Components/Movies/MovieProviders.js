import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieProviders } from "../../app/features/movies/details/movieProvidersSlice";
import {
  Box,
  Spinner,
  Text,
  Center,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Heading,
  Tooltip,
} from "@chakra-ui/react";

const MovieProviders = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { providers, status, error } = useSelector(
    (state) => state.movieProviders
  );

  useEffect(() => {
    dispatch(fetchMovieProviders(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <Center py={6}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  if (status === "failed") {
    return (
      <Center py={6}>
        <Text color="red.500">Hata: {error}</Text>
      </Center>
    );
  }

  const renderProviders = (providers) => (
    <SimpleGrid columns={{ base: 3, sm: 4, md: 6, lg: 8 }} spacing={4}>
      {providers.map((provider) => (
        <Box
          key={provider.provider_id}
          textAlign="center"
          maxW="80px"
          mx="auto">
          <Tooltip label={provider.provider_name} fontSize="md">
            <Image
              src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
              alt={provider.provider_name}
              mb={2}
              borderRadius="full"
              boxShadow="md"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.1)" }}
            />
          </Tooltip>
        </Box>
      ))}
    </SimpleGrid>
  );

  const renderProviderSection = (countryCode, countryName) => {
    const countryProviders = providers[countryCode];
    if (!countryProviders) return null;

    const { flatrate, rent, buy } = countryProviders;
    return (
      <Box mb={6}>
        <Heading size="md" mb={4} color="blue.700">
          {countryName}
        </Heading>
        <Tabs variant="enclosed-colored" colorScheme="blue">
          <TabList mb="1em" flexWrap="wrap">
            {flatrate && (
              <Tab w="auto" flexShrink={0} px={4} py={2}>
                Abonelik
              </Tab>
            )}
            {rent && (
              <Tab w="auto" flexShrink={0} px={4} py={2}>
                Kiralama
              </Tab>
            )}
            {buy && (
              <Tab w="auto" flexShrink={0} px={4} py={2}>
                Satın Alma
              </Tab>
            )}
          </TabList>
          <TabPanels>
            {flatrate && <TabPanel>{renderProviders(flatrate)}</TabPanel>}
            {rent && <TabPanel>{renderProviders(rent)}</TabPanel>}
            {buy && <TabPanel>{renderProviders(buy)}</TabPanel>}
          </TabPanels>
        </Tabs>
      </Box>
    );
  };

  return (
    <Box p={4} bg="gray.50" borderRadius="md" boxShadow="lg" m={4}>
      {providers && (
        <Tabs variant="enclosed-colored" colorScheme="blue">
          <TabList mb="1em" flexWrap="wrap">
            <Tab w="auto" flexShrink={0} px={4} py={2}>
              ABD
            </Tab>
            <Tab w="auto" flexShrink={0} px={4} py={2}>
              Türkiye
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {renderProviderSection("US", "Amerika Birleşik Devletleri")}
            </TabPanel>
            <TabPanel>{renderProviderSection("TR", "Türkiye")}</TabPanel>
          </TabPanels>
        </Tabs>
      )}
      {!providers && (
        <Center py={6}>
          <Text fontSize="lg" color="gray.500">
            Sağlayıcı bulunamadı.
          </Text>
        </Center>
      )}
    </Box>
  );
};

export default MovieProviders;
