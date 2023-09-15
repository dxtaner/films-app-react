import { configureStore } from "@reduxjs/toolkit";
import popularReducer from "../app/features/movies/popularSlice.js";
import topMoviesReducer from "./features/movies/topSlice.js";
import upcomingMoviesReducer from "./features/movies/upcomingSlice.js";
import detailsReducer from "./features/movies/details/detailsSlice.js";
import trailerReducer from "./features/movies/details/trailerSlice.js";
import favoritesReducer from "./features/movies/favoritesSlice.js";
import accountReducer from "./features/account/accountSlice.js";

export default configureStore({
  reducer: {
    popular: popularReducer,
    topMovies: topMoviesReducer,
    upcoming: upcomingMoviesReducer,
    details: detailsReducer,
    trailer: trailerReducer,
    favorites: favoritesReducer,
    account: accountReducer,
  },
});
