import { ProfileReqType } from "@/schema/profile";
import { AuthServices } from "@/services/client-side/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const UpdateProfileThunk = createAsyncThunk(
  "/update-profile",
  async (profile: ProfileReqType, { rejectWithValue }) => {
    try {
      const res = await AuthServices.updateMe(profile);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
