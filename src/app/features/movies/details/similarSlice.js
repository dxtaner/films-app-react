// similarSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSimilarMovies } from "../../../../Components/Services/movies"; // Benzer filmleri çekmek için API çağrısını eklemelisiniz.

const initialState = {
  similar: [],
  status: "idle",
  error: null,
};

export const fetchSimilarMovies = createAsyncThunk(
  "movies/fetchSimilarMovies",
  async (movieId) => {
    try {
      const response = await getSimilarMovies(movieId); // Benzer filmleri çeken API çağrısı
      return response.results;
    } catch (error) {
      throw Error("Benzer filmleri alırken bir hata oluştu.");
    }
  }
);

const similarSlice = createSlice({
  name: "similar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimilarMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.similar = action.payload; // API yanıtından gelen veriyi ayarla
      })
      .addCase(fetchSimilarMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default similarSlice.reducer;
export const selectSimilarMovies = (state) => state.similar.similar; // Redux state'ine uygun şekilde erişim sağla
