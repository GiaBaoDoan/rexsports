import { CollectionSeverices } from "@/services/collections";
import { CollectionReqType } from "@/types/collection";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface DataType {
  id: string;
  collection: CollectionReqType;
}

export const updateCollection = createAsyncThunk(
  "/update-collection",
  async ({ id, collection }: DataType, { rejectWithValue }) => {
    try {
      const res = await CollectionSeverices.updateCollection(id, collection);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
