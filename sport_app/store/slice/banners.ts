import { fetchBanners } from "@/store/thunk/fetch-banners";
import { BannerRes } from "@/types/banner";
import { ApiError } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
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
  name: "BannersSlice",
  initialState,
  reducers: {
    // filterByName: (state, action) => {
    //   const key = action.payload.toLowerCase();
    //   state.banners = state.original.filter((cat) =>
    //     removeVietnameseTones(cat.name)
    //       .toLowerCase()
    //       .includes(removeVietnameseTones(key))
    //   );
    // },
  },
  extraReducers(builder) {
    builder.addCase(fetchBanners.fulfilled, (state, { payload }) => {
      const { data } = payload;
      state.original = state.banners = data as BannerRes[];
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchBanners.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBanners.rejected, (state, action) => {
      state.isLoading = false;
      state.banners = state.original = [];
      state.error = action.payload as AxiosError<ApiError>;
    });
  },
});

// export const { filterByName } = BannerSlice.actions;

export default BannerSlice.reducer;
