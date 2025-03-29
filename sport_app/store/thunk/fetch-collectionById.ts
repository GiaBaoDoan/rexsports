import { CollectionSeverices } from "@/services/client-side/collections";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCollectionById = createAsyncThunk(
  "/get-detail-collection",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await CollectionSeverices.getCollectionById(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
