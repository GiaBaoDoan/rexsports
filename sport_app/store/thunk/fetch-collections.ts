import { CollectionSeverices } from "@/services/client-side/collections";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCollections = createAsyncThunk(
  "/get-collections",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CollectionSeverices.getAllCollections();
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
