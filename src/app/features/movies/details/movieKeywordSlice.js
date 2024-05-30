import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovieKeywords } from "../../../../Components/Services/movies";

export const fetchMovieKeywords = createAsyncThunk(
  "movieKeywords/fetchMovieKeywords",
  async (movieId, thunkAPI) => {
    try {
      const keywords = await getMovieKeywords(movieId);
      return keywords;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const movieKeywordsSlice = createSlice({
  name: "movieKeywords",
  initialState: {
    keywords: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieKeywords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieKeywords.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.keywords = action.payload;
      })
      .addCase(fetchMovieKeywords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default movieKeywordsSlice.reducer;
