import { configureStore } from "@reduxjs/toolkit";
import popularReducer from "../app/features/movies/popularSlice.js";
import topMoviesReducer from "./features/movies/topSlice.js";
import upcomingMoviesReducer from "./features/movies/upcomingSlice.js";
import detailsReducer from "./features/movies/details/detailsSlice.js";
import trailerReducer from "./features/movies/details/trailerSlice.js";
import favoritesReducer from "./features/movies/favoritesSlice.js";
import accountReducer from "./features/account/accountSlice.js";
import creditReducer from "./features/movies/details/creditSlice.js";
import personReducer from "./features/actors/personSlice.js";
import personMoviesReducer from "./features/actors/personMoviesSlice.js";
import personPopularReducer from "./features/actors/personPopularSlice.js";
import personExternalIdsReducer from "./features/actors/personExternalIdsSlice.js";
import movieExternalIdsReducer from "./features/movies/details/movieExternalIdsSlice.js";
import similarReducer from "./features/movies/details/similarSlice.js";
import watchListReducer from "./features/movies/watchListSlice.js";
import ratedMovieReducer from "./features/movies/ratedMovieSlice.js";
import searchMovieReducer from "./features/movies/searchSlice.js";
import personSearchReducer from "./features/actors/personSearchSlice.js";
import popularSeriesReducer from "./features/series/popularSeriesSlice.js";
import topSeriesReducer from "./features/series/topSeriesSlice.js";
import discoverMoviesReducer from "./features/movies/discoverMoviesSlice.js";
import movieCollectionReducer from "./features/movies/details/movieCollectionSlice.js";
import movieCollectionImagesReducer from "./features/movies/details/movieCollectionImagesSlice.js";

export default configureStore({
  reducer: {
    popular: popularReducer,
    topMovies: topMoviesReducer,
    upcoming: upcomingMoviesReducer,
    details: detailsReducer,
    trailer: trailerReducer,
    favorites: favoritesReducer,
    account: accountReducer,
    credit: creditReducer,
    person: personReducer,
    personMovies: personMoviesReducer,
    popularPersons: personPopularReducer,
    personExternalIds: personExternalIdsReducer,
    movieExternalIds: movieExternalIdsReducer,
    watchList: watchListReducer,
    similar: similarReducer,
    popularSeries: popularSeriesReducer,
    topSeries: topSeriesReducer,
    ratedMovies: ratedMovieReducer,
    search: searchMovieReducer,
    personSearch: personSearchReducer,
    discoverMovies: discoverMoviesReducer,
    movieCollection: movieCollectionReducer,
    movieCollectionImages: movieCollectionImagesReducer,
  },
});
