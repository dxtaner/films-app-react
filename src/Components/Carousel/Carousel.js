import { Carousel } from "react-responsive-carousel";
// import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, useMediaQuery } from "@chakra-ui/react";

const AppCarousel = ({ data }) => {
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  return (
    <Carousel showThumbs={false} showArrows autoPlay renderIndicator={false}>
      {data.map((items, index) => (
        <div key={index}>
          <img
            src={`https://image.tmdb.org/t/p/original${items.backdrop_path}`}
            alt={items.original_title} // Veya alt=""
          />
          <Box
            position="absolute"
            top="0"
            width="100%"
            padding="2"
            bg="blackAlpha.800"
            color="white"
            fontSize={["sm", "md", "lg"]}>
            {items.original_title}
          </Box>
          {!isMobile && <p className="legend">{items.overview}</p>}
        </div>
      ))}
    </Carousel>
  );
};
export default AppCarousel;
