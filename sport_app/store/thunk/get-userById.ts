import { UserServices } from "@/services/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserById = createAsyncThunk(
  "/get-detail-user",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await UserServices.getUserById(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
