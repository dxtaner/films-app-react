import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMoviesDetails,
  addMovieToFavorite,
  addMovieToWatchList,
  addToMovieRatings,
  removeFromMovieRatings,
} from "../../../../Components/Services/movies.js";
import { getAccountDetails } from "../../../../Components/Services/auth.js";

const initialState = {
  details: {},
  status: "idle",
};

export const getDetails = createAsyncThunk(
  "movies/getMovieDetails",
  async (id) => {
    try {
      const result = await getMoviesDetails(id);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "movies/addToFavorites",
  async (movieId, isFavorite) => {
    try {
      const { id } = await getAccountDetails();
      await addMovieToFavorite(id, {
        media_type: "movie",
        media_id: movieId,
        favorite: isFavorite,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const addToWatchList = createAsyncThunk(
  "movies/addToWatchList",
  async (movieId, isWatchListed) => {
    try {
      const { id } = await getAccountDetails();

      await addMovieToWatchList(id, {
        media_type: "movie",
        media_id: movieId,
        watchlist: isWatchListed,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "movies/removeFromFavorites",
  async (location_id, isFavorite) => {
    try {
      const { id } = await getAccountDetails();

      await addMovieToFavorite(id, {
        media_type: "movie",
        media_id: location_id,
        favorite: !isFavorite,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const removeFromWatchList = createAsyncThunk(
  "movies/removeFromWatchList",
  async (location_id, isWatchListed) => {
    try {
      const { id } = await getAccountDetails();

      await addMovieToWatchList(id, {
        media_type: "movie",
        media_id: location_id,
        watchlist: !isWatchListed,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const addToMovieRating = createAsyncThunk(
  "movies/addToMovieRating",
  async (movie) => {
    try {
      await addToMovieRatings(movie.id, movie.rating);
    } catch (error) {
      console.error("An error occurred while adding movie rating:", error);
      throw error;
    }
  }
);

export const removeFromRating = createAsyncThunk(
  "movies/removeFromRating",
  async (movieId) => {
    try {
      await removeFromMovieRatings(movieId);
    } catch (error) {
      console.error("An error occurred while removing movie rating:", error);
      throw error;
    }
  }
);

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDetails.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.details = action.payload;
        state.status = "success";
      })
      .addCase(addToFavorites.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addToFavorites.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(addToWatchList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addToWatchList.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(addToMovieRating.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addToMovieRating.fulfilled, (state) => {
        state.status = "success";
      });
  },
});

export default detailsSlice.reducer;
export const detailsList = (state) => state.details.details;
