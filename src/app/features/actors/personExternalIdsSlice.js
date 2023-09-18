import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPersonExternalIds } from "../../../Components/Services/person.js";

// Async thunk ile kişi dış kimlik bilgilerini alma işlemi
export const fetchPersonExternalIds = createAsyncThunk(
  "personExternalIds/fetchPersonExternalIds",
  async (personId) => {
    const response = await getPersonExternalIds(personId);
    return response;
  }
);

// Kişi dış kimlik bilgileri slice'ı oluşturuluyor
const personExternalIdsSlice = createSlice({
  name: "personExternalIds",
  initialState: {
    data: null, // Kişi dış kimlik bilgileri
    status: "idle", // Async işlemin durumu ("idle", "loading", "succeeded", "failed")
    error: null, // Hata mesajı (eğer varsa)
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

// Kişi dış kimlik bilgilerini seçmek için bir selektör oluşturuluyor
export const selectPersonExternalIds = (state) => state.personExternalIds.data;

export default personExternalIdsSlice.reducer;
