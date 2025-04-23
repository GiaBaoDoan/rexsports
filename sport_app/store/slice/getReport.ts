import { fetchRevenue } from "@/store/thunk/fetch-revenue";
import { getReport } from "@/store/thunk/get-report";
import { ReportRes } from "@/types/dashboard";
import { createSlice } from "@reduxjs/toolkit";
import { ApiError } from "next/dist/server/api-utils";

type initialState = {
  report: ReportRes | null;
  isLoading: boolean;
  error: ApiError | null;
};
const initialState: initialState = {
  report: null,
  isLoading: false,
  error: null,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getReport.fulfilled, (state, action) => {
      state.report = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getReport.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getReport.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isLoading = false;
    });
  },
});

export default reportSlice.reducer;
