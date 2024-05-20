import React from "react";
import { Carousel } from "react-responsive-carousel";
import { useMediaQuery, Box, Heading, Text } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";

const AppCarousel = ({ data }) => {
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  if (!data || !data.results || !Array.isArray(data.results)) {
    return null;
  }

  const renderIndicator = (onClickHandler, isSelected, index, label) => (
    <span
      onClick={onClickHandler}
      key={index}
      style={{
        background: isSelected ? "#0074d9" : "#ffffff",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        display: "inline-block",
        margin: "0 5px",
        cursor: "pointer",
        transition: "background 0.3s",
      }}
      aria-label={`Slide ${label}`}
    />
  );

  return (
    <Carousel
      showThumbs={false}
      showArrows={!isMobile}
      autoPlay
      renderIndicator={renderIndicator}
      infiniteLoop
      interval={5000}
      transitionTime={1000}>
      {data.results.map((item, index) => (
        <div className="carousel-item" key={index}>
          <img
            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            alt={item.original_title}
            className="carousel-image"
            aria-label={item.original_title}
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.5)"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            color="white"
            p={4}>
            <Heading as="h2" size={isMobile ? "md" : "xl"} mb={4}>
              {item.original_title}
            </Heading>
            {!isMobile && (
              <Text fontSize="lg" textAlign="center" maxW="80%">
                {item.overview}
              </Text>
            )}
          </Box>
        </div>
      ))}
    </Carousel>
  );
};

export default AppCarousel;
