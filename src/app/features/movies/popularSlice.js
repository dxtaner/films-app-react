import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPopularMovies } from "../../../Components/Services/movies.js";

const initialState = {
  popular: [],
  status: "idle",
  currentPage: 1,
  totalPages: 0,
  totalResults: 0,
};

export const getPopular = createAsyncThunk(
  "movies/getPopularMovies",
  async (_, { getState }) => {
    try {
      const state = getState();
      const currentPage = state.popular.currentPage;
      const response = await getPopularMovies(currentPage);
      return response;
    } catch (error) {
      console.error("Popüler filmler getirilirken bir hata oluştu:", error);
      throw error;
    }
  }
);

export const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopular.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPopular.fulfilled, (state, action) => {
        if (state.currentPage === 1) {
          state.popular = action.payload.results;
        } else {
          state.popular = [...state.popular, ...action.payload.results];
        }
        state.totalPages = action.payload.total_pages;
        state.totalResults = action.payload.total_results;
        state.currentPage = action.payload.page;
        state.status = "succeeded";
      })
      .addCase(getPopular.rejected, (state, action) => {
        state.status = "failed";
        console.error("Popüler filmler getirilemedi:", action.error);
      });
  },
});

export default popularSlice.reducer;

export const { setCurrentPage } = popularSlice.actions;

export const popularList = (state) => state.popular.popular;
export const currentPage = (state) => state.popular.currentPage;
export const totalPages = (state) => state.popular.totalPages;
export const totalResults = (state) => state.popular.totalResults;
