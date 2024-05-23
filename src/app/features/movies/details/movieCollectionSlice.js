import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieCollection } from "../../../../Components/Services/movies.js";

export const fetchCollectionById = createAsyncThunk(
  "movieCollection/fetchCollectionById",
  async (id, thunkAPI) => {
    try {
      const response = await fetchMovieCollection(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  movieCollection: null,
  isLoading: false,
  error: null,
};

const movieCollectionSlice = createSlice({
  name: "movieCollection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectionById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCollectionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieCollection = action.payload;
        state.error = null;
      })
      .addCase(fetchCollectionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
});

export default movieCollectionSlice.reducer;
