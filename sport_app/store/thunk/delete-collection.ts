import { CollectionSeverices } from "@/services/client-side/collections";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteCollection = createAsyncThunk(
  "/delete-collection",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await CollectionSeverices.deleteCollection(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
