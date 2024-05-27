import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccountDetails } from "../../../Components/Services/auth.js";
import { getFavoritesMovies } from "../../../Components/Services/movies.js";

export const favoritesLoading = (state) => state.favorites.loading;

const initialState = {
  favorites: [],
  status: "idle",
};

export const getFavorites = createAsyncThunk(
  "movies/getFavorites",
  async () => {
    try {
      const { id } = await getAccountDetails();
      const response = await getFavoritesMovies(id);
      return {
        results: response.results,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload.results;
        state.status = "success";
        state.isLoading = true;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
      });
  },
});

export default favoritesSlice.reducer;
export const favoritesListMovies = (state) => state.favorites.favorites;
