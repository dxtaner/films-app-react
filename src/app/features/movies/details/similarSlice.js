import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSimilarMovies } from "../../../../Components/Services/movies";

const initialState = {
  similar: [],
  status: "idle",
  error: null,
};

export const fetchSimilarMovies = createAsyncThunk(
  "movies/fetchSimilarMovies",

  async (movieId, { rejectWithValue }) => {
    try {
      const response = await getSimilarMovies(movieId);

      return response?.results || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.status_message ||
          error.message ||
          "No similar films were found.",
      );
    }
  },
);

const similarSlice = createSlice({
  name: "similar",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchSimilarMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.similar = action.payload || [];
      })

      .addCase(fetchSimilarMovies.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload || action.error.message;

        state.similar = [];
      });
  },
});

export default similarSlice.reducer;

export const selectSimilarMovies = (state) => state.similar.similar;
