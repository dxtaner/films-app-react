import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPersonMovieCredits } from "../../../Components/Services/person.js";

export const fetchPersonMovieCredits = createAsyncThunk(
  "personMovies/fetchPersonMovieCredits",
  async (personId) => {
    try {
      const response = await getPersonMovieCredits(personId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const personMoviesSlice = createSlice({
  name: "personMovies",
  initialState: {
    credits: { cast: [], crew: [], id: null },
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonMovieCredits.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPersonMovieCredits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.credits = action.payload;
      })
      .addCase(fetchPersonMovieCredits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default personMoviesSlice.reducer;
export const selectPersonMovieCredits = (state) => state.personMovies.credits;
