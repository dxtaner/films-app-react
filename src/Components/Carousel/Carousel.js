import React from "react";
import { Carousel } from "react-responsive-carousel";
import { useMediaQuery, Box, Heading, Text, VStack } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";

const AppCarousel = ({ data }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }

  const renderIndicator = (onClickHandler, isSelected, index, label) => (
    <span
      onClick={onClickHandler}
      key={index}
      style={{
        background: isSelected ? "#E53E3E" : "rgba(255, 255, 255, 0.4)",
        width: isSelected ? "24px" : "8px",
        height: "8px",
        borderRadius: "4px",
        display: "inline-block",
        margin: "0 4px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      aria-label={`Slide ${label}`}
    />
  );

  return (
    <Box borderRadius="2xl" overflow="hidden" boxShadow="2xl" mb={6}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={!isMobile}
        autoPlay
        renderIndicator={renderIndicator}
        infiniteLoop
        interval={6000}
        transitionTime={800}
      >
        {data.map((item, index) => (
          <div className="carousel-item" key={item.id || index}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt={item.title || item.original_title}
              className="carousel-image"
            />

            {/* Karartma Gradyanı & Metin Katmanı */}
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-t, gray.900 10%, rgba(15, 23, 42, 0.4) 60%, transparent 100%)"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              alignItems="flex-start"
              p={{ base: 6, md: 12 }}
              textAlign="left"
            >
              <VStack
                align="flex-start"
                spacing={3}
                maxW={{ base: "100%", md: "70%" }}
              >
                <Heading
                  as="h2"
                  size={isMobile ? "lg" : "2xl"}
                  color="white"
                  fontWeight="extrabold"
                  lineHeight="tight"
                  textShadow="0 2px 10px rgba(0,0,0,0.7)"
                >
                  {item.title || item.original_title}
                </Heading>

                {!isMobile && item.overview && (
                  <Text
                    fontSize="md"
                    color="gray.300"
                    noOfLines={3}
                    textShadow="0 1px 5px rgba(0,0,0,0.7)"
                    fontWeight="medium"
                  >
                    {item.overview}
                  </Text>
                )}
              </VStack>
            </Box>
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default AppCarousel;
