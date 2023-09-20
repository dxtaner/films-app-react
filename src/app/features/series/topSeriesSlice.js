// topSeriesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSeriesTop } from "../../../Components/Services/series.js"; // series.js'den veri almak için oluşturduğunuz fonksiyonu import edin

// Asenkron bir şekilde en iyi dizileri getirmek için bir async thunk oluşturun
export const fetchTopRatedSeries = createAsyncThunk(
  "topSeries/fetchTopRatedSeries",
  async () => {
    const response = await getSeriesTop();
    return response.results; // series.js'den gelen veriyi kullanabiliriz
  }
);

// Initial state'i tanımlayın
const initialState = {
  series: [],
  status: "idle",
  error: null,
};

// Slice'ı oluşturun
const topSeriesSlice = createSlice({
  name: "topSeries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopRatedSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.series = action.payload;
      })
      .addCase(fetchTopRatedSeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default topSeriesSlice.reducer;
