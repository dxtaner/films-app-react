import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSeriesPopular } from "../../../Components/Services/series.js";

export const fetchPopularSeries = createAsyncThunk(
  "popularSeries/fetchPopularSeries",
  async () => {
    const response = await getSeriesPopular();
    return response.results;
  }
);

const initialState = {
  series: [],
  status: "idle",
  error: null,
};

const popularSeriesSlice = createSlice({
  name: "popularSeries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.series = action.payload;
      })
      .addCase(fetchPopularSeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default popularSeriesSlice.reducer;
