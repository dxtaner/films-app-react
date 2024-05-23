import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCollectionImages } from "../../../../Components/Services/movies.js";

export const fetchCollectionImagesAsync = createAsyncThunk(
  "movieCollectionImages/fetchCollectionImages",
  async (collectionId, thunkAPI) => {
    try {
      const data = await fetchCollectionImages(collectionId);
      return data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  images: [],
  loading: false,
  error: null,
};

const movieCollectionImagesSlice = createSlice({
  name: "movieCollectionImages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectionImagesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollectionImagesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.images = action.payload;
      })
      .addCase(fetchCollectionImagesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch collection images.";
      });
  },
});

export default movieCollectionImagesSlice.reducer;
