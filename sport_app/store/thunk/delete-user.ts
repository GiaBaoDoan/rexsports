import { UserServices } from "@/services/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteUserThunk = createAsyncThunk(
  "/delete-user",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await UserServices.deleteUser(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
