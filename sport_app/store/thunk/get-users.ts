import { UserServices } from "@/services/client-side/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsersThunk = createAsyncThunk(
  "/get-all-users",
  async (_, { rejectWithValue }) => {
    try {
      const res = await UserServices.getAllUsers();
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
