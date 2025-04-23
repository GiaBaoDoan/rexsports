import { fetchBannerById } from "@/store/thunk/fetch-bannerById";
import { BannerRes } from "@/types/banner";
import { ApiError } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  banner: BannerRes | null;
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
};

const initialState: initialState = {
  banner: null,
  isLoading: false,
  error: null,
};

const BannerById = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBannerById.fulfilled, (state, action) => {
      state.banner = action.payload.data;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchBannerById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBannerById.rejected, (state, action) => {
      state.banner = null;
      state.isLoading = false;
      state.error = action.payload as AxiosError<ApiError>;
    });
  },
});

export default BannerById.reducer;
