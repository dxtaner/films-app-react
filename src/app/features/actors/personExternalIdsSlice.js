import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPersonExternalIds } from "../../../Components/Services/person.js";

export const fetchPersonExternalIds = createAsyncThunk(
  "personExternalIds/fetchPersonExternalIds",
  async (personId) => {
    const response = await getPersonExternalIds(personId);
    return response;
  }
);

const personExternalIdsSlice = createSlice({
  name: "personExternalIds",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonExternalIds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPersonExternalIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPersonExternalIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectPersonExternalIds = (state) => state.personExternalIds.data;
export default personExternalIdsSlice.reducer;
