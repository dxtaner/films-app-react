import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMoviesCredit } from "../../../../Components/Services/movies.js";

const initialState = {
  credit: [],
  status: "idle",
  error: null,
};

export const getCredit = createAsyncThunk(
  "movies/getMovieCredit",
  async (id, { rejectWithValue }) => {
    try {
      const results = await getMoviesCredit(id);
      return results;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const creditSlice = createSlice({
  name: "credit",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCredit.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCredit.fulfilled, (state, action) => {
        state.credit = action.payload;
        state.status = "success";
      });
  },
});

export default creditSlice.reducer;
export const creditList = (state) => state.credit.credit;
