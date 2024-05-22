import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSeriesPopular } from "../../../Components/Services/series.js";

export const fetchPopularSeries = createAsyncThunk(
  "popularSeries/fetchPopularSeries",
  async (page = 1) => {
    const response = await getSeriesPopular(page);
    return response;
  }
);

const initialState = {
  series: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const popularSeriesSlice = createSlice({
  name: "popularSeries",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.series = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchPopularSeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = popularSeriesSlice.actions;
export default popularSeriesSlice.reducer;
