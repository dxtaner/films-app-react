// topSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTopRatedMovies } from "../../../Components/Services/movies.js";

const initialState = {
  topMovies: [],
  status: "idle", // "boşta" yerine "idle" kullanmanız daha uygun olabilir
};

export const getTopMovies = createAsyncThunk(
  "movies/getTopMovies",
  async () => {
    try {
      const response = await getTopRatedMovies();
      return response.results; // API yanıtındaki 'results' özelliğine erişim
    } catch (error) {
      console.error("getTopMovies error:", error);
      throw error;
    }
  }
);

export const topMoviesSlice = createSlice({
  name: "topMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTopMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topMovies = action.payload;
      })
      .addCase(getTopMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default topMoviesSlice.reducer;
export const topList = (state) => state.topMovies.topMovies;
