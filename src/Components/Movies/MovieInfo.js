import React from "react";
import { Divider } from "@chakra-ui/react";
import MovieOverview from "./MovieOverview";
import MovieExternalIds from "./MovieExternalIds";

const MovieInfo = ({ movieDetails, movieExternalIds }) => (
  <>
    <Divider />
    <MovieOverview movieDetails={movieDetails} />
    <Divider />
    <MovieExternalIds movieExternalIds={movieExternalIds} />
  </>
);

export default MovieInfo;
