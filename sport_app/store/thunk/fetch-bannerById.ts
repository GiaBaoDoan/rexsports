import { bannerServices } from "@/services/client-side/banners";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBannerById = createAsyncThunk(
  "/fetch-banner",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await bannerServices.fetchBannerById(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
