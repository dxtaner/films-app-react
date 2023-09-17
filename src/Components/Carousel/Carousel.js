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

  return (
    <Carousel
      showThumbs={false}
      showArrows={!isMobile} // Mobil cihazlarda okları gizle
      autoPlay
      renderIndicator={(onClickHandler, isSelected, index, label) => (
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
          }}
          aria-label={`Slide ${label}`}
        />
      )}>
      {data.results.map((item, index) => (
        <div className="carousel-item" key={index}>
          <img
            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            alt={item.original_title}
            className="carousel-image"
          />
          <div className="carousel-content">
            <Box>
              <Heading as="h2" size="xl" mb={4} color="white">
                {item.original_title}
              </Heading>
              {!isMobile && (
                <Text fontSize="lg" color="white" m={8}>
                  {item.overview}
                </Text>
              )}
            </Box>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default AppCarousel;
