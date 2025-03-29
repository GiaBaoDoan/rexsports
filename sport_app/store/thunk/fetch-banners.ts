import { bannerServices } from "@/services/client-side/banners";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBanners = createAsyncThunk(
  "/fetch-banners",
  async (_, { rejectWithValue }) => {
    try {
      const res = await bannerServices.fetchBanners();
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
