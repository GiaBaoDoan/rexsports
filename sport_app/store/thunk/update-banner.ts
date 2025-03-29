import { BannerRequestForm } from "@/schema/banner";
import { bannerServices } from "@/services/client-side/banners";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface DataType {
  id: string;
  data: BannerRequestForm;
}

export const updateBanner = createAsyncThunk(
  "/update-banner",
  async ({ id, data }: DataType, { rejectWithValue }) => {
    try {
      const res = await bannerServices.updateBanner(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
