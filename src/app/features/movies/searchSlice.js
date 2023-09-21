import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchMovies } from "../../../Components/Services/movies.js";

export const searchMoviesAsync = createAsyncThunk(
  "search/searchMovies",
  async (query) => {
    const response = await searchMovies(query);
    return response;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    status: "idle",
    results: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMoviesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMoviesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(searchMoviesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;

// Arama işleminin sonucunu seçici (selector) oluşturun
export const selectSearchResults = (state) => state.search.results;
export const selectSearchStatus = (state) => state.search.status;
export const selectSearchError = (state) => state.search.error;
