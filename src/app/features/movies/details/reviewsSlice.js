import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieReviews } from "../../../../Components/Services/movies.js";

const initialState = {
  reviews: [],
  status: "idle",
  error: null,
};

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (movieId, thunkAPI) => {
    try {
      const response = await fetchMovieReviews(movieId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const reviewsSlice = createSlice({
  name: "movieReviews",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchReviews.pending]: (state) => {
      state.status = "loading";
    },
    [fetchReviews.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.movieReviews = action.payload;
    },
    [fetchReviews.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    },
  },
});

export default reviewsSlice.reducer;
