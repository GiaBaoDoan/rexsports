import { UpdatePasswordType } from "@/schema/password";
import { AuthServices } from "@/services/client-side/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const UpdatePasswordThunk = createAsyncThunk(
  "/update-password",
  async (data: UpdatePasswordType, { rejectWithValue }) => {
    try {
      const res = await AuthServices.updatePassword(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
