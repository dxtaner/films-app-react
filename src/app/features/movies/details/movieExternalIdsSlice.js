import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovieExternalIds } from "../../../../Components/Services/movies.js";

export const fetchMovieExternalIds = createAsyncThunk(
  "movieExternalIds/fetchMovieExternalIds",
  async (movieId) => {
    try {
      const response = await getMovieExternalIds(movieId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const movieExternalIdsSlice = createSlice({
  name: "movieExternalIds",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieExternalIds.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovieExternalIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchMovieExternalIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectMovieExternalIds = (state) => state.movieExternalIds.data;
export default movieExternalIdsSlice.reducer;
