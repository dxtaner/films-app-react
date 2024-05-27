import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPersonImages } from "../../../Components/Services/person";

export const fetchPersonImagesAsync = createAsyncThunk(
  "personImages/fetchPersonImages",
  async (personId, { rejectWithValue }) => {
    try {
      const data = await fetchPersonImages(personId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const personImagesSlice = createSlice({
  name: "personImages",
  initialState: {
    images: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonImagesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPersonImagesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.images = action.payload;
      })
      .addCase(fetchPersonImagesAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const selectPersonImages = (state) => state.personImages.images;
export const selectPersonImagesStatus = (state) => state.personImages.status;
export const selectPersonImagesError = (state) => state.personImages.error;
export default personImagesSlice.reducer;
