import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPersonInfo } from "../../../Components/Services/person.js";

const initialState = {
  person: null,
  status: "idle",
  error: null,
};

export const fetchPersonInfo = createAsyncThunk(
  "person/fetchPersonInfo",
  async (personId, { rejectWithValue }) => {
    try {
      const response = await getPersonInfo(personId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPersonInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.person = action.payload;
      })
      .addCase(fetchPersonInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default personSlice.reducer;

export const selectPerson = (state) => state.person.person;
export const selectPersonStatus = (state) => state.person.status;
export const selectPersonError = (state) => state.person.error;
