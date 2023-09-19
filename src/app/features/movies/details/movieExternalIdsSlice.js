import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovieExternalIds } from "../../../../Components/Services/movies.js";

// Async thunk ile film dış kimlik bilgilerini alma işlemi
export const fetchMovieExternalIds = createAsyncThunk(
  "movieExternalIds/fetchMovieExternalIds",
  async (movieId) => {
    try {
      const response = await getMovieExternalIds(movieId);
      // console.log("Response Data:", response); // Response verisini logla
      return response;
    } catch (error) {
      throw error; // Hata durumunda hata fırlatılır
    }
  }
);

// movie dış kimlik bilgileri slice'ı oluşturuluyor
const movieExternalIdsSlice = createSlice({
  name: "movieExternalIds",
  initialState: {
    data: null, // Film dış kimlik bilgileri
    status: "idle", // Async işlemin durumu ("idle", "loading", "succeeded", "failed")
    error: null, // Hata mesajı (eğer varsa)
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieExternalIds.pending, (state) => {
        state.status = "loading";
        state.error = null; // Yeni bir istek başladığında önceki hata temizlenir
      })
      .addCase(fetchMovieExternalIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchMovieExternalIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Film dış kimlik bilgilerini seçmek için bir selektör oluşturuluyor
export const selectMovieExternalIds = (state) => state.movieExternalIds.data;

export default movieExternalIdsSlice.reducer;
