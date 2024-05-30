import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchPersons } from "../../../Components/Services/person";

const initialState = {
  searchResults: [],
  status: "idle",
  error: null,
};

export const searchPersonsAsync = createAsyncThunk(
  "personSearch/searchPersons",
  async (query) => {
    const response = await searchPersons(query);
    return response.results;
  }
);

export const personSearchSlice = createSlice({
  name: "personSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchPersonsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPersonsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.searchResults = action.payload;
      })
      .addCase(searchPersonsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      });
  },
});

export const selectSearchResults = (state) => state.personSearch.searchResults;
export const selectSearchStatus = (state) => state.personSearch.status;

export default personSearchSlice.reducer;
