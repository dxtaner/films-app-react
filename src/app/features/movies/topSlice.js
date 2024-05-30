import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTopRatedMovies } from "../../../Components/Services/movies.js";

const initialState = {
  topMovies: [],
  status: "idle",
  currentPage: 1,
};

export const getTopMovies = createAsyncThunk(
  "movies/getTopMovies",
  async (page = 1) => {
    try {
      const response = await getTopRatedMovies(page);
      return response.results;
    } catch (error) {
      console.error("getTopMovies error:", error);
      throw error;
    }
  }
);

export const topMoviesSlice = createSlice({
  name: "topMovies",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTopMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.currentPage === 1) {
          state.topMovies = action.payload;
        } else {
          state.topMovies = [...state.topMovies, ...action.payload];
        }
      })
      .addCase(getTopMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setCurrentPage } = topMoviesSlice.actions;
export default topMoviesSlice.reducer;
export const topList = (state) => state.topMovies.topMovies;
export const currentPage = (state) => state.topMovies.currentPage;
export const topLoading = (state) => state.topMovies.status === "loading";
