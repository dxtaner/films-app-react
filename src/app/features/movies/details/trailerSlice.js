import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMoviesTrailer } from "../../../../Components/Services/movies.js";

const initialState = {
  trailer: [],
  status: "idle",
};

export const getTrailer = createAsyncThunk(
  "movies/getMovieTrailer",
  async (id) => {
    try {
      const { results } = await getMoviesTrailer(id);
      return results;
    } catch (error) {
      console.log(error);
    }
  }
);

export const trailerSlice = createSlice({
  name: "trailer",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTrailer.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getTrailer.fulfilled, (state, action) => {
        state.trailer = action.payload;
        state.status = "success";
      });
  },
});
export default trailerSlice.reducer;
export const trailerList = (state) => state.trailer.trailer;
