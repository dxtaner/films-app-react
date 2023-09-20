import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSeriesPopular } from "../../../Components/Services/series.js"; // series.js'den veri almak için oluşturduğunuz fonksiyonu import edin

// Asenkron bir şekilde popüler dizileri getirmek için bir async thunk oluşturun
export const fetchPopularSeries = createAsyncThunk(
  "popularSeries/fetchPopularSeries",
  async () => {
    const response = await getSeriesPopular();
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
