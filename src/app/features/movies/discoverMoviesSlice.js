import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { discoverMovies } from "../../../Components/Services/movies.js";

const initialState = {
  movies: [],
  status: "idle",
  error: null,
  page: 1,
};

export const fetchDiscoverMovies = createAsyncThunk(
  "discoverMovies/fetchDiscoverMovies",
  async (queryParams, { rejectWithValue }) => {
    try {
      const movies = await discoverMovies(queryParams);
      return movies;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const discoverMoviesSlice = createSlice({
  name: "discoverMovies",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscoverMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDiscoverMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchDiscoverMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setPage } = discoverMoviesSlice.actions;
export default discoverMoviesSlice.reducer;
