import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovieProviders } from "../../../../Components/Services/movies";

export const fetchMovieProviders = createAsyncThunk(
  "movieProviders/fetchMovieProviders",
  async (movieId) => {
    const providers = await getMovieProviders(movieId);
    return providers;
  }
);

const movieProvidersSlice = createSlice({
  name: "movieProviders",
  initialState: {
    providers: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieProviders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieProviders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.providers = action.payload;
      })
      .addCase(fetchMovieProviders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default movieProvidersSlice.reducer;
