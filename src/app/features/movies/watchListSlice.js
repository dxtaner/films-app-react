import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWatchListMovies } from "../../../Components/Services/movies.js";
import { getAccountDetails } from "../../../Components/Services/auth.js";

export const watchListLoading = (state) => state.watchList.loading;

const initialState = {
  watchList: [],
  isLoading: false,
  status: "idle",
};

// İzleme listesini alma işlemi
export const getWatchList = createAsyncThunk(
  "movies/getWatchList",
  async () => {
    try {
      const { id } = await getAccountDetails();
      const result = await getWatchListMovies(id);
      return result;
    } catch (error) {
      console.error("İzleme listesi alınırken hata oluştu:", error);
      throw error;
    }
  }
);

export const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWatchList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWatchList.fulfilled, (state, action) => {
        state.watchList = action.payload;
        state.isLoading = false;
      })
      .addCase(getWatchList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default watchListSlice.reducer;
export const watchListMovies = (state) => state.watchList.watchList;
