import { removeVietnameseTones } from "@/lib/string";
import { fetchBanners } from "@/store/thunk/fetch-banners";
import { BannerRes } from "@/types/banner";
import { ApiError } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  original: BannerRes[];
  banners: BannerRes[];
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
};

const initialState: initialState = {
  original: [],
  banners: [],
  isLoading: false,
  error: null,
};

const BannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    filterByTitle: (state, action: PayloadAction<string>) => {
      const key = action.payload.toLowerCase();
      state.banners = state.original.filter((banner) =>
        removeVietnameseTones(banner.title)
          .toLowerCase()
          .includes(removeVietnameseTones(key))
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBanners.fulfilled, (state, action) => {
      state.original = state.banners = action.payload.data;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchBanners.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBanners.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as AxiosError<ApiError>;
    });
  },
});

export const { filterByTitle } = BannerSlice.actions;

export default BannerSlice.reducer;
