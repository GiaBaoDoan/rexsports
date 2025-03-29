import { fetchRevenue } from "@/store/thunk/fetch-revenue";
import { RevenueRes } from "@/types/dashboard";
import { createSlice } from "@reduxjs/toolkit";
import { ApiError } from "next/dist/server/api-utils";

type initialState = {
  revenue: RevenueRes | null;
  isLoading: boolean;
  error: ApiError | null;
};
const initialState: initialState = {
  revenue: null,
  isLoading: false,
  error: null,
};

export const revenueSlice = createSlice({
  name: "revenue",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRevenue.fulfilled, (state, action) => {
      state.revenue = action.payload.data as RevenueRes;
      state.isLoading = false;
    });
    builder.addCase(fetchRevenue.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRevenue.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isLoading = false;
    });
  },
});

export default revenueSlice.reducer;
