import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSeriesTop } from "../../../Components/Services/series.js";

export const fetchTopRatedSeries = createAsyncThunk(
  "topSeries/fetchTopRatedSeries",
  async (page) => {
    const response = await getSeriesTop(page);
    return {
      results: response.results,
      totalPages: response.total_pages,
    };
  }
);

const initialState = {
  series: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 0,
};

const topSeriesSlice = createSlice({
  name: "topSeries",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopRatedSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.series = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTopRatedSeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = topSeriesSlice.actions;

export default topSeriesSlice.reducer;
