import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUpcomingMovies } from "../../../Components/Services/movies.js";

const initialState = {
  upcoming: [],
  status: "idle",
  currentPage: 1,
  totalPages: 1,
};

export const getUpcoming = createAsyncThunk(
  "movies/getUpcomingMovies",
  async (page = 1) => {
    try {
      const response = await getUpcomingMovies(page);
      return { results: response.results, totalPages: response.total_pages };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const upComingSlice = createSlice({
  name: "upcoming",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUpcoming.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUpcoming.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalPages = action.payload.totalPages;
        if (state.currentPage === 1) {
          state.upcoming = action.payload.results;
        } else {
          state.upcoming = [...state.upcoming, ...action.payload.results];
        }
      })
      .addCase(getUpcoming.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = upComingSlice.actions;
export default upComingSlice.reducer;
export const upcomingList = (state) => state.upcoming.upcoming;
export const upcomingLoading = (state) => state.upcoming.status === "loading";
export const currentPage = (state) => state.upcoming.currentPage;
export const totalPages = (state) => state.upcoming.totalPages;
export const error = (state) => state.upcoming.error;
