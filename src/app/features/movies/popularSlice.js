import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPopularMovies } from "../../../Components/Services/movies.js";

const initialState = {
  popular: [],
  status: "idle",
};

export const getPopular = createAsyncThunk(
  "movies/getPopularMovies",
  async () => {
    try {
      const popularMovies = await getPopularMovies();
      return popularMovies;
    } catch (error) {
      console.error("An error occurred while fetching popular movies:", error);
      throw error;
    }
  }
);

export const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopular.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPopular.fulfilled, (state, action) => {
        state.popular = action.payload;
        state.status = "succeeded";
      })
      .addCase(getPopular.rejected, (state, action) => {
        state.status = "failed";
        console.error("Failed to fetch popular movies:", action.error);
      });
  },
});

export default popularSlice.reducer;

export const popularList = (state) => state.popular.popular;
