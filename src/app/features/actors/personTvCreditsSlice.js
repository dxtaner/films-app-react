import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTVCredits } from "../../../Components/Services/person";

export const getPersonTvCredits = createAsyncThunk(
  "personTvCredits/getPersonTvCredits",
  async (personId, { rejectWithValue }) => {
    try {
      const tvCredits = await fetchTVCredits(personId);
      return tvCredits;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const personTvCreditsSlice = createSlice({
  name: "personTvCredits",
  initialState: {
    tvCredits: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPersonTvCredits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPersonTvCredits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tvCredits = action.payload;
      })
      .addCase(getPersonTvCredits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default personTvCreditsSlice.reducer;
