import { Carousel } from "react-responsive-carousel";
import { Box, useMediaQuery } from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";

const AppCarousel = ({ data }) => {
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  // data.results dizisi tanımlı mı kontrol ediyorum
  if (!data || !data.results || !Array.isArray(data.results)) {
    return null; // Veri yoksa veya uygun bir yapıda değilse Carousel'ı render etmiyorum
  }

  return (
    <Carousel showThumbs={false} showArrows autoPlay renderIndicator={false}>
      {data.results.map((item, index) => (
        <div className="carousel-item" key={index}>
          <img
            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            alt={item.original_title}
            className="carousel-image"
          />
          <div className="carousel-content">
            <h2 className="carousel-title">{item.original_title}</h2>
            {!isMobile && (
              <p className="carousel-description">{item.overview}</p>
            )}
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default AppCarousel;
