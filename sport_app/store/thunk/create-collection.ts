import { CollectionSeverices } from "@/services/client-side/collections";
import { CollectionReqType } from "@/types/collection";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCollection = createAsyncThunk(
  "/create-collection",
  async (data: CollectionReqType, { rejectWithValue }) => {
    try {
      const res = await CollectionSeverices.createCollection(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
