import { bannerServices } from "@/services/client-side/banners";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteBanner = createAsyncThunk(
  "/delete-banner",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await bannerServices.deleteBanner(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
