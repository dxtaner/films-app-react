import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUpcomingMovies } from "../../../Components/Services/movies.js";

export const upcomingLoading = (state) => state.upcoming.loading;

const initialState = {
  upcoming: [],
  status: "idle",
};

export const getUpcoming = createAsyncThunk(
  "movies/getUpcomingMovies",
  async () => {
    try {
      const { results } = await getUpcomingMovies();
      return results;
    } catch (error) {
      console.log(error);
    }
  }
);

export const upComingSlice = createSlice({
  name: "upcoming",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUpcoming.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUpcoming.fulfilled, (state, action) => {
        state.upcoming = action.payload;
        state.status = "success";
      });
  },
});
export default upComingSlice.reducer;
export const upcomingList = (state) => state.upcoming.upcoming;
