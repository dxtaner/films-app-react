import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPopularPersons } from "../../../Components/Services/person.js";

const initialState = {
  popularPersons: [],
};

export const getPopularPersonsAsync = createAsyncThunk(
  "popularPersons/fetchPopularPersons",
  async () => {
    try {
      const { results } = await getPopularPersons();
      return results;
    } catch (error) {
      console.error("Error fetching popular persons:", error);
      throw error;
    }
  }
);

export const popularPersonSlice = createSlice({
  name: "popularPerson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularPersonsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPopularPersonsAsync.fulfilled, (state, action) => {
        state.popularPersons = action.payload;
        state.status = "succeeded";
      })
      .addCase(getPopularPersonsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default popularPersonSlice.reducer;

export const selectPopularPersons = (state) =>
  state.popularPersons.popularPersons;
export const selectPopularPersonsStatus = (state) =>
  state.popularPersons.status;
export const selectPopularPersonsError = (state) => state.popularPersons.error;
