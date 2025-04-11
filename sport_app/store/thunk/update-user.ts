import { UserReqType } from "@/components/forms/UserForm";
import { UserServices } from "@/services/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface DataType {
  id: string;
  user: UserReqType;
}

export const UpdateUserThunk = createAsyncThunk(
  "/update-user",
  async ({ id, user }: DataType, { rejectWithValue }) => {
    try {
      const res = await UserServices.updateUser(id, user);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
