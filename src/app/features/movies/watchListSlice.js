import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWatchListMovies } from "../../../Components/Services/movies.js";

const initialState = {
  watchList: [],
  isLoading: false,
};

// İzleme listesini alma işlemi
export const getWatchList = createAsyncThunk(
  "movies/getWatchList",
  async () => {
    try {
      const result = await getWatchListMovies(); // İzleme listesini almak için gereken servis işlemini burada çağırın
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
  reducers: {},
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
export const watchListLoading = (state) => state.watchList.isLoading;
