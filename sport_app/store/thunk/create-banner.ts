import { BannerRequestForm } from "@/schema/banner";
import { bannerServices } from "@/services/banners";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBanner = createAsyncThunk(
  "/create-banner",
  async (data: BannerRequestForm, { rejectWithValue }) => {
    try {
      const res = await bannerServices.createBanner(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
