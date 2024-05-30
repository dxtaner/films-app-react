import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovieImages } from "../../../../Components/Services/movies";

export const fetchMovieImages = createAsyncThunk(
  "movieImages/fetchMovieImages",
  async (movieId) => {
    try {
      const images = await getMovieImages(movieId);
      return images;
    } catch (error) {
      throw new Error("Failed to fetch movie images");
    }
  }
);

const movieImagesSlice = createSlice({
  name: "movieImages",
  initialState: {
    backdrops: [],
    logos: [],
    posters: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { backdrops, logos, posters } = action.payload || {};
        state.backdrops = backdrops || [];
        state.logos = logos || [];
        state.posters = posters || [];
        state.error = null;
      })
      .addCase(fetchMovieImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default movieImagesSlice.reducer;
