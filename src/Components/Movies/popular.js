import { useEffect } from "react";
import AppCarousel from "../Carousel/Carousel.js";
import { useDispatch, useSelector } from "react-redux";
import {
  popularList,
  getPopular,
} from "../../app/features/movies/popularSlice.js";

const PopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(popularList);

  useEffect(() => {
    dispatch(getPopular());
  }, [dispatch]);

  return <AppCarousel data={popularMovies} />;
};
export default PopularMovies;
