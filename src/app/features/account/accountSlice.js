import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccountDetails } from "../../../Components/Services/auth.js";

const initialState = {
  account: {},
  status: "boşta",
};

export const getAccountInfo = createAsyncThunk(
  "account/getAccountInfo",
  async () => {
    try {
      const { avatar } = await getAccountDetails();
      return avatar.tmdb;
    } catch (error) {
      console.log(error);
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAccountInfo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAccountInfo.fulfilled, (state, action) => {
        state.account = action.payload;
        state.status = "success";
      });
  },
});
export default accountSlice.reducer;
export const accountData = (state) => state.account.account;
