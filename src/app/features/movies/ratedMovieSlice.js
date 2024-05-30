import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRatedMovies } from "../../../Components/Services/movies.js";
import { getAccountDetails } from "../../../Components/Services/auth.js";

export const ratedMoviesLoading = (state) => state.ratedMovies.loading;

const initialState = {
  ratedMovies: [],
  isLoading: false,
};

export const fetchRatedMovies = createAsyncThunk(
  "ratedMovies/fetchRatedMovies",
  async () => {
    try {
      const { account_id } = await getAccountDetails();
      const ratedMovies = await getRatedMovies(account_id);
      return ratedMovies.results;
    } catch (error) {
      throw error;
    }
  }
);

export const ratedMovieSlice = createSlice({
  name: "ratedMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatedMovies.pending, (state) => {
        state.isLoading = "loading";
      })
      .addCase(fetchRatedMovies.fulfilled, (state, action) => {
        state.ratedMovies = action.payload;
        state.isLoading = true;
      })
      .addCase(fetchRatedMovies.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default ratedMovieSlice.reducer;
export const selectRatedMovies = (state) => state.ratedMovies.ratedMovies;
