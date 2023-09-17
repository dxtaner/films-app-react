import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPopularPersons } from "../../../Components/Services/person.js";

const initialState = {
  popularPersons: [], // Verileri popularPersons olarak güncelledik
  status: "idle",
};

export const getPopularPersonsAsync = createAsyncThunk(
  "popularPersons/fetchPopularPersons", // Aksiyonun adını güncelledik
  async () => {
    try {
      const { results } = await getPopularPersons();
      return results;
    } catch (error) {
      console.error("Error fetching popular persons:", error);
      throw error; // Hata durumunu yeniden fırlat
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
        state.popularPersons = action.payload; // Verileri güncelledik
        state.status = "succeeded";
      })
      .addCase(getPopularPersonsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Hata mesajını saklayabilirsiniz
      });
  },
});

export default popularPersonSlice.reducer;

export const selectPopularPersons = (state) =>
  state.popularPersons.popularPersons; // Selector'ı güncelledik
export const selectPopularPersonsStatus = (state) =>
  state.popularPersons.status; // Yükleme durumu selector'ını ekledik
export const selectPopularPersonsError = (state) => state.popularPersons.error; // Hata selector'ını ekledik
