import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRatedMovies } from "../../../Components/Services/movies.js";

const initialState = {
  ratedMovies: [],
  isLoading: false,
};

// Derecelendirilmiş filmleri alma işlemi
export const fetchRatedMovies = createAsyncThunk(
  "ratedMovies/fetchRatedMovies",
  async (account_id, thunkAPI) => {
    try {
      const ratedMovies = await getRatedMovies(account_id);
      return ratedMovies;
    } catch (error) {
      // console.error("Derecelendirilmiş filmleri alma işleminde hata:", error);
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
        state.isLoading = true;
      })
      .addCase(fetchRatedMovies.fulfilled, (state, action) => {
        state.ratedMovies = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRatedMovies.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default ratedMovieSlice.reducer;
export const selectRatedMovies = (state) => state.ratedMovies.ratedMovies;
export const selectRatedMoviesLoading = (state) => state.ratedMovies.isLoading;
