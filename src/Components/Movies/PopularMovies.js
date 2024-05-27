import React, { useState, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPopular,
  popularList,
  currentPage,
  totalPages,
  setCurrentPage,
} from "../../app/features/movies/popularSlice";
import PopularMoviesCard from "../Cards/PopularMoviesCard";

const PopularMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector(popularList);
  const page = useSelector(currentPage);
  const total = useSelector(totalPages);

  const [activeIndex, setActiveIndex] = useState(0);
  const prevMoviesLength = useRef(0);

  useEffect(() => {
    dispatch(getPopular());
  }, [dispatch, page]);

  useEffect(() => {
    if (prevMoviesLength.current < movies.length) {
      const intervalId = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % movies.length;
          if (nextIndex === 0 && page < total) {
            setTimeout(() => {
              dispatch(setCurrentPage(page + 1));
            }, 0);
          }
          return nextIndex;
        });
      }, 3000);

      return () => clearInterval(intervalId);
    }
    prevMoviesLength.current = movies.length;
  }, [movies, page, total, dispatch]);

  return (
    <Box>
      <Box overflowX="hidden" position="relative" m={2} p={2}>
        <Box
          display="flex"
          transition="transform 0.5s ease-in-out"
          transform={`translateX(-${activeIndex * 200}px)`}
          width={`${movies.length * 200}px`}>
          {movies.map((movie, index) => (
            <Box key={index} m={2} width="200px">
              <PopularMoviesCard movie={movie} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PopularMovies;
