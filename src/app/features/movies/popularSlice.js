import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPopularMovies } from "../../../Components/Services/movies.js";

const initialState = {
  popular: [],
  status: "Boşta",
};

export const getPopular = createAsyncThunk(
  "movies/getPopularMovies",
  async () => {
    try {
      const popularMovies = await getPopularMovies();
      return popularMovies;
    } catch (error) {
      console.log(error);
    }
  }
);

export const popularSlice = createSlice({
  name: "popular",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPopular.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getPopular.fulfilled, (state, action) => {
        state.popular = action.payload;
        state.status = "success";
      });
  },
});

export default popularSlice.reducer;

export const popularList = (state) => state.popular.popular;
