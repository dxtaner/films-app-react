import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { discoverMovies } from "../../../Components/Services/movies.js"; // API isteği yapmak için kullanılacak işlev

const initialState = {
  movies: [],
  status: "idle",
  error: null,
  page: 1, // Sayfa numarasını burada saklayabilirsiniz, başlangıçta 1 olarak ayarladım
};

export const fetchDiscoverMovies = createAsyncThunk(
  "discoverMovies/fetchDiscoverMovies",
  async (queryParams, { rejectWithValue }) => {
    try {
      const movies = await discoverMovies(queryParams);
      return movies;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const discoverMoviesSlice = createSlice({
  name: "discoverMovies",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload; // Sayfa numarasını ayarlamak için bir action ve payload kullanın
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscoverMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDiscoverMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchDiscoverMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setPage } = discoverMoviesSlice.actions; // setPage action'ını dışa aktarın

export default discoverMoviesSlice.reducer;
